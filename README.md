Link al repositorio de GitHub : https://github.com/RocketReyes7/Actividad-4-Full-Stack.git





# 🚀 Node.js Auth API - Actividad 4

Este proyecto es una API REST construida con **Node.js**, **Express** y **MongoDB Atlas**, diseñada para gestionar la autenticación de usuarios y la administración de ítems. Incluye middlewares para manejo de errores y seguridad (CORS).

## 🛠️ Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución para JavaScript.
* **Express**: Framework para el servidor web.
* **MongoDB Atlas**: Base de datos NoSQL en la nube.
* **Mongoose**: ODM para interactuar con MongoDB.
* **Dotenv**: Gestión de variables de entorno.
* **CORS**: Seguridad para peticiones entre dominios.

## 📋 Requisitos Previos

1.  Node.js instalado (v16 o superior recomendado).
2.  Cuenta en MongoDB Atlas con un clúster activo.
3.  Configurar la IP `0.0.0.0/0` en el Network Access de Atlas.

## ⚙️ Configuración del Proyecto

1.  Clona el repositorio o descarga los archivos.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la **raíz del proyecto** (al mismo nivel que `package.json`) con el siguiente contenido:

    ```env
    PORT=3000
    MONGO_URI=mongodb+srv://admin:1234@tu_cluster.mongodb.net/nombre_db?retryWrites=true&w=majority
    JWT_SECRET=tu_clave_secreta
    NODE_ENV=development
    ```

## 🚀 Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
node src/app.js