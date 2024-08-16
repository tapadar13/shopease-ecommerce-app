FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]