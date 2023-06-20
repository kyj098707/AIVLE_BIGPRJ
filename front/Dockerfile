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
COPY --from=builder /usr/src/app/build /usr/share/nginx/html