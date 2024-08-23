FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate
# RUN npm run prisma:migrate:deploy
# RUN npm run prisma:seed
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
