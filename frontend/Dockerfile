FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expone el puerto donde corre React
EXPOSE 3000

CMD ["npm", "start"]
