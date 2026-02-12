const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Aquí guardaremos el hash, no la clave plana
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);