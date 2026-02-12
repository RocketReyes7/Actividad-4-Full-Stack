require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const conectarDB = require('./config/db'); // Importamos la conexión a MongoDB

console.log("URI being used:", process.env.MONGO_URI);

const app = express();

// 1. CONEXIÓN A LA BASE DE DATOS
// Asegúrate de que en tu .env tengas MONGODB_URI
conectarDB();

// 2. MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir archivos estáticos del frontend (HTML de login, etc.)
app.use(express.static(path.join(__dirname, '../frontend')));

// 3. RUTAS
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// 4. RUTA PARA EL FRONTEND (Opcional: Redirige al login por defecto)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 5. MIDDLEWARE DE MANEJO DE ERRORES (Punto 2 de tus instrucciones)
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        // El stack trace solo se muestra en modo desarrollo por seguridad
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

// 6. INICIO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en: http://localhost:${PORT}`);
    console.log(`🛠️ Modo: ${process.env.NODE_ENV || 'production'}`);
});

module.exports = app; // Exportamos para las pruebas con Jest