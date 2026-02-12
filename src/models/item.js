const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String },
    stock: { type: Number, default: 0 },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);