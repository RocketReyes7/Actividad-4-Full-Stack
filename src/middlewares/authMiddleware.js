const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Leer el token del header 'Authorization'
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se encontró un token.' });
    }

    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = cifrado; // Guardamos los datos del usuario en el request
        next(); // Permitimos pasar a la ruta
    } catch (error) {
        res.status(401).json({ message: 'Token no válido o expirado.' });
    }
};