FROM node:18
WORKDIR /app
COPY nest-app/package*.json ./
RUN npm install --force
RUN npm install -g @nestjs/cli
COPY ./nest-app/ .
CMD ["npm", "run", "start:dev"]
