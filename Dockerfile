# Obtenemos una imagen con Node instalado
FROM node:boron
# Establecemos nuestro directorio de trabajo
WORKDIR /usr/src/app
# Copiamos nuestro package.json para instalar las dependencias
# No copiamos todo el proyecto de una vez para aprovechar la cache de imágenes
COPY package.json .
# Instalamos las dependencias del proyecto
RUN npm install
# Copiamos todo el proyecto
# Con dockerignore vamos a evitar copiar archivos innecesarios como node_modules 
# o el repositorio de git
COPY . .
# Exponemos el puerto por el cual nuestra aplicación se comunicará hacia afuera, este debe ser el mismo por
# el que tenemos excuchando nuestra app de express
EXPOSE 3200
# Finalmente especificamos el comando para iniciar nuestra app, este será el que se corra cuando iniciemos el contenedor
CMD [ "npm", "start" ]