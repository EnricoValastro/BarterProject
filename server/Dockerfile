FROM node:12-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY ./ ./

ENV PORT=4000
EXPOSE 4000

CMD ["npm", "start"]
