FROM node:lts-alpine3.20

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
