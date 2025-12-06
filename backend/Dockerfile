FROM node:18

WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el backend
COPY . .

# Copia el script que espera a Metabase
COPY wait-metabase.js .

EXPOSE 3000

# El backend NO arranca directo, sino a través de wait-metabase.js
CMD ["node", "wait-metabase.js"]
