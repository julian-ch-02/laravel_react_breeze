FROM node:18.7.0-slim

WORKDIR /var/www/html/react

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
