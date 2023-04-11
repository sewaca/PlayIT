FROM node:current-alpine
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./

RUN npm run build
RUN npm i -g serve concurrently lcp
CMD ["concurrently", "\"npm run proxy\"", "\"serve -s dist\""]
