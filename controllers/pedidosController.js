const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({ mensaje: 'Pedido guardado' });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        if (!pedido) {
            res.json({ mensaje: 'Pedido no encontrado' });
            return next();
        }

        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });;

        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndDelete({_id: req.params.id});

        if(!pedido) {
            res.json({ mensaje: 'Pedido no encontrado' });
            return next();
        }

        res.json({ mensaje: 'Pedido eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}
