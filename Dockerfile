FROM node:13-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV NODE_PATH /app/node_modules