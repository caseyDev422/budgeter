FROM node:16.17.1-alpine

WORKDIR /app
COPY package.json .
COPY prisma ./prisma/
COPY .env .env

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 8080
CMD ["npm", "start"]