FROM node:current-alpine
WORKDIR /app

COPY ./dist ./dist
RUN npm i -g serve concurrently lcp
CMD ["concurrently", "\"lcp --proxyUrl https://api.vk.com/ --port 8010\"", "\"serve -s dist\""]
