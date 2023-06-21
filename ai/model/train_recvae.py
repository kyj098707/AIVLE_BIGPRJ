import numpy as np
import torch
from torch import optim
from config import *
import random
from copy import deepcopy
from utils import get_data, ndcg, recall
from model import RecVAE
import json
import datetime
import os
import time
import wandb

seed = args.seed
random.seed(seed)
np.random.seed(seed)
torch.manual_seed(seed)

wandb.init(project="Algoking", config={"model": "Rec-VAE",
                                       "batch_size": args.batch_size,
                                       "lr"        : args.lr,
                                       "epochs"    : args.n_epochs})
wandb.run.name = "RecVAE"

device = torch.device("cuda:0")

data = get_data(args.dataset)
train_data, valid_in_data, valid_out_data, test_in_data, test_out_data = data

def generate(batch_size, device, data_in, data_out=None, shuffle=False, samples_perc_per_epoch=1):
    assert 0 < samples_perc_per_epoch <= 1
    
    total_samples = data_in.shape[0]
    samples_per_epoch = int(total_samples * samples_perc_per_epoch)
    
    if shuffle:
        idxlist = np.arange(total_samples)
        np.random.shuffle(idxlist)
        idxlist = idxlist[:samples_per_epoch]
    else:
        idxlist = np.arange(samples_per_epoch)
    
    for st_idx in range(0, samples_per_epoch, batch_size):
        end_idx = min(st_idx + batch_size, samples_per_epoch)
        idx = idxlist[st_idx:end_idx]

        yield Batch(device, idx, data_in, data_out)


class Batch:
    def __init__(self, device, idx, data_in, data_out=None):
        self._device = device
        self._idx = idx
        self._data_in = data_in
        self._data_out = data_out
    
    def get_idx(self):
        return self._idx
    
    def get_idx_to_dev(self):
        return torch.LongTensor(self.get_idx()).to(self._device)
        
    def get_ratings(self, is_out=False):
        data = self._data_out if is_out else self._data_in
        return data[self._idx]
    
    def get_ratings_to_dev(self, is_out=False):
        return torch.Tensor(
            self.get_ratings(is_out).toarray()
        ).to(self._device)


def evaluate(model, data_in, data_out, metrics, samples_perc_per_epoch=1, batch_size=500):
    metrics = deepcopy(metrics)
    model.eval()
    
    for m in metrics:
        m['score'] = []
    
    for batch in generate(batch_size=batch_size,
                          device=device,
                          data_in=data_in,
                          data_out=data_out,
                          samples_perc_per_epoch=samples_perc_per_epoch
                         ):
        
        ratings_in = batch.get_ratings_to_dev()
        ratings_out = batch.get_ratings(is_out=True)
    
        ratings_pred = model(ratings_in, calculate_loss=False).cpu().detach().numpy()
        
        if not (data_in is data_out):
            ratings_pred[batch.get_ratings().nonzero()] = -np.inf
            
        for m in metrics:
            m['score'].append(m['metric'](ratings_pred, ratings_out, k=m['k']))

    for m in metrics:
        m['score'] = np.concatenate(m['score']).mean()
        
    return [x['score'] for x in metrics]


def run(model, opts, train_data, batch_size, n_epochs, beta, gamma, dropout_rate):
    model.train()
    for epoch in range(n_epochs):
        for batch in generate(batch_size=batch_size, device=device, data_in=train_data, shuffle=True):
            ratings = batch.get_ratings_to_dev()

            for optimizer in opts:
                optimizer.zero_grad()
                
            _, loss = model(ratings, beta=beta, gamma=gamma, dropout_rate=dropout_rate)
            loss.backward()
            
            for optimizer in opts:
                optimizer.step()


model_kwargs = {
    'hidden_dim': args.hidden_dim,
    'latent_dim': args.latent_dim,
    'input_dim': train_data.shape[1]
}
metrics = [{'metric': recall, 'k': 20}]

best_r20 = -np.inf
train_scores, valid_scores = [], []

update_count = 0
early_stopping = args.early_stopping
stopping_count = 0

log_dir_name = str(datetime.datetime.now())[0:10] + '_recvae'
log_dir = os.path.join(args.log_dir, log_dir_name)

if not os.path.exists(log_dir):
    os.makedirs(log_dir)

if not os.path.exists(args.save_dir):
    os.makedirs(args.save_dir)

model = RecVAE(**model_kwargs).to(device)

learning_kwargs = {
    'model': model,
    'train_data': train_data,
    'batch_size': args.batch_size,
    'beta': args.beta,
    'gamma': args.gamma
}

decoder_params = set(model.decoder.parameters())
encoder_params = set(model.encoder.parameters())

optimizer_encoder = optim.Adam(encoder_params, lr=args.lr)
optimizer_decoder = optim.Adam(decoder_params, lr=args.lr)


for epoch in range(1, args.n_epochs+1):
    epoch_start_time = time.time()
    if args.not_alternating:
        run(opts=[optimizer_encoder, optimizer_decoder], n_epochs=1, dropout_rate=0.5, **learning_kwargs)
    else:
        run(opts=[optimizer_encoder], n_epochs=args.n_enc_epochs, dropout_rate=0.5, **learning_kwargs)
        model.update_prior()
        run(opts=[optimizer_decoder], n_epochs=args.n_dec_epochs, dropout_rate=0, **learning_kwargs)

    train_scores.append(
        evaluate(model, train_data, train_data, metrics, 0.01)[0]
    )
    valid_scores.append(
        evaluate(model, valid_in_data, valid_out_data, metrics, 1)[0]
    )
        
    print('-' * 89)
    print('| end of epoch {:3d}/{:3d} | time: {:4.2f}s | train recall@20 {:4.4f} | valid recall@20 {:5.4f} '.format(
        epoch, args.n_epochs, time.time() - epoch_start_time, train_scores[-1], valid_scores[-1]))
    print('-' * 89)
    
    wandb.log({"recvae_r20": valid_scores[-1]})

    if valid_scores[-1] > best_r20:
        best_r20 = valid_scores[-1]
        with open(os.path.join(log_dir, 'best_recvae_' + args.save), 'wb') as f:
            torch.save(model.state_dict(), f)
            print(f"Best model saved! r@20 : {valid_scores[-1]:.4f}")
        stopping_cnt = 0
    else:
        print(f'Stopping Count : {stopping_cnt} / {early_stopping}')
        stopping_cnt += 1
    
    if stopping_cnt > early_stopping:
        print('*****Early Stopping*****')
        break

with open(os.path.join(log_dir, 'best_recvae_' + args.save), 'rb') as f:
    model.load_state_dict(torch.load(f))
torch.save(model.state_dict(), args.save_dir + '/recvae.pth')

test_metrics = [{'metric': ndcg, 'k': 100}, {'metric': recall, 'k': 20}, {'metric': recall, 'k': 10}]
final_scores = evaluate(model, test_in_data, test_out_data, test_metrics)

for metric, score in zip(test_metrics, final_scores):
    print(f"{metric['metric'].__name__}@{metric['k']}:\t{score:.4f}")

with open(args.dataset + '/model_score.json', 'r', encoding="utf-8") as f:
    model_score = json.load(f)

model_score['recvae'] = final_scores[1]
with open(args.dataset + '/model_score.json', 'w', encoding="utf-8") as f:
    json.dump(model_score, f, ensure_ascii=False, indent="\t")
