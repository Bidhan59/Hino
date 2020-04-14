FROM node:10
WORKDIR /dataServices
COPY package.json /dataServices
RUN npm install
COPY . /dataServices
CMD node server.js
EXPOSE 3000