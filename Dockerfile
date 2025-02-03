FROM node:20-alpine

WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD npm run start