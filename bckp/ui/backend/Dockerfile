FROM node:lts-alpine

ENV NODE_ENV="development"

# 作業ディレクトリ作成&設定
WORKDIR /src

#RUN npm install -g http-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
#CMD [ "npm", "start" ]