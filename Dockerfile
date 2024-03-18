FROM node:18-alpine3.18
RUN adduser -D agent
WORKDIR /
COPY . .

COPY package*.json ./
RUN npm install

RUN npm run build
EXPOSE 3000

USER agent
CMD ["npm", "start"]
