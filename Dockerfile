FROM node:12

ARG DB=defaultValue

ENV DB_CONNECTION_STRING =${DB}

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]