const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        await cliente.save();
        res.json({ mensaje: 'Cliente creado' });
    } catch (error) {
        res.send(error);
        next();
    }
}

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.id);

        if (!cliente) {
            res.json({ mensaje: 'Cliente no encontrado' });
            next();
        }

        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        if (!cliente) {
            res.json({ mensaje: 'Cliente no encontrado' });
            next();
        }

        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

exports.eliminarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndDelete({ _id: req.params.id });

        if (!cliente) {
            res.json({ mensaje: 'Cliente no encontrado' });
            next();
        }

        res.json({ mensaje: 'Cliente eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}
