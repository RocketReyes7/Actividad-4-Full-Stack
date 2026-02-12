const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // Desactivamos el buffering para que si no hay conexión, 
        // falle rápido en lugar de quedarse "pensando"
        mongoose.set('bufferCommands', false);

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Falla tras 5 segundos si no hay respuesta
            socketTimeoutMS: 45000,
            family: 4 // Fuerza el uso de IPv4 (esto ayuda mucho en redes locales)
        });
        console.log('✅ Conexión establecida y lista para peticiones');
    } catch (error) {
        console.error('❌ ERROR CRÍTICO DE MONGO:', error.message);
        // Si sale "IP NOT WHITELISTED", el problema sigue siendo el paso 1
    }
};

module.exports = conectarDB;