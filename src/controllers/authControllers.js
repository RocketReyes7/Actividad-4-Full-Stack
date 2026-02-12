const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({ nombre, email, password: hashedPassword });
        await nuevoUsuario.save();

        res.status(201).json({ success: true, message: 'Usuario creado' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });

        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) return res.status(400).json({ message: 'Contraseña incorrecta' });

        // Generar Token JWT
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};