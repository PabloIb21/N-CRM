const { Schema, model } = require('mongoose');

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
    },
    pedido: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = model('Pedidos', pedidosSchema);
