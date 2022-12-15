FROM node:14.19.3-alpine3.15
WORKDIR /docker-react
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["yarn","start"]
