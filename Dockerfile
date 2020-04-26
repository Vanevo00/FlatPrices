FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN mkdir client
COPY client/package*.json client/

RUN npm i
RUN cd client && npm i

COPY . .

RUN npm run build
RUN cd client && npm run build

EXPOSE 4000
EXPOSE 3999

CMD ["npm", "run", "start"]
