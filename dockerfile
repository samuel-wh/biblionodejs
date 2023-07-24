# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del backend al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecuta la aplicación de Express
EXPOSE 3000

# Comando para ejecutar la aplicación de Express
CMD ["npm", "run", "dev"]
