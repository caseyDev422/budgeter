FROM node:16.17.1-alpine

WORKDIR /app
COPY package.json .
RUN npm install
RUN npx prisma generate
COPY . .

EXPOSE 3000:3000
CMD [ "npm", "start" ]