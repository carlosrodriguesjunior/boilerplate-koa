FROM node:4

RUN mkdir /www
COPY . /www

WORKDIR /www

RUN npm i nodemon -g

RUN npm install

CMD ["npm", "start"]
