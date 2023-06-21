FROM node:18.16.0 as builder

WORKDIR '/usr/src/app'

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN yarn add node-sass
RUN yarn add react-scripts
COPY ./ ./

CMD ["yarn","build"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html