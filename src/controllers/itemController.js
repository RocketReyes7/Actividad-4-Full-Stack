const Item = require('../models/Item');

// Obtener todos los productos
exports.getAll = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.json({ success: true, data: items });
    } catch (error) {
        next(error);
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find(); // Trae todo de MongoDB Atlas
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un producto (Ruta Protegida)
exports.create = async (req, res, next) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json({ success: true, data: savedItem });
    } catch (error) {
        next(error);
    }
};

// Actualizar un producto (Ruta Protegida)
exports.update = async (req, res, next) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedItem) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ success: true, data: updatedItem });
    } catch (error) {
        next(error);
    }
};

// Eliminar un producto (Ruta Protegida)
exports.delete = async (req, res, next) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};