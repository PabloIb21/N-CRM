const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

const auth = require('../middlewares/auth');

module.exports = function() {
  // Clientes
  router.post('/clientes', 
    auth,
    clientesController.nuevoCliente
  );
  router.get('/clientes', 
    auth,
    clientesController.mostrarClientes
  );
  router.get('/clientes/:id', 
    auth,
    clientesController.mostrarCliente
  );
  router.put('/clientes/:id', 
    auth,
    clientesController.actualizarCliente
  );
  router.delete('/clientes/:id', 
    auth,
    clientesController.eliminarCliente
  );

  // Productos
  router.post('/productos', 
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );
  router.get('/productos', 
    auth,
    productosController.mostrarProductos
  );
  router.get('/productos/:id', 
    auth,
    productosController.mostrarProducto
  );
  router.put('/productos/:id', 
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );
  router.delete('/productos/:id', 
    auth.apply,
    productosController.eliminarProducto
  );
  router.post('/productos/busqueda/:query', 
    auth.apply,
    productosController.buscarProducto
  );

  // Pedidos
  router.post('/pedidos/nuevo/:id', 
    auth,
    pedidosController.nuevoPedido
  );
  router.get('/pedidos', 
    auth,
    pedidosController.mostrarPedidos
  );
  router.get('/pedidos/:id', 
    auth,
    pedidosController.mostrarPedido
  );
  router.put('/pedidos/:id', 
    auth,
    pedidosController.actualizarPedido
  );
  router.delete('/pedidos/:id', 
    auth,
    pedidosController.eliminarPedido
  );

  // Usuarios
  router.post('/crear-cuenta', usuariosController.registrarUsuario);
  router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

  return router;
}
