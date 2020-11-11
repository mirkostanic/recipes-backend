FROM node:14

RUN mkdir -p /usr/src/recipe-backend

WORKDIR /usr/src/recipe-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]