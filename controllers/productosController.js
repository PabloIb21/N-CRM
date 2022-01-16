const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname + '../../uploads/');
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next){
        if(!file.mimetype.includes('image')){
            return next(new Error('El archivo no es una imagen'), false);
        }
        next(null, true);
    }
}

const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error});
        }
        return next();
    });
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({ mensaje: 'Producto creado' });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json({ productos });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.id);

        if(!producto){
            res.json({mensaje: 'Producto no encontrado'});
            return next();
        }

        res.json({ producto });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarProducto = async (req, res, next) => {
    try {
        let nuevoProducto = req.body;
        
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.id);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        if(!producto){
            res.json({mensaje: 'Producto no encontrado'});
            return next();
        }

        res.json({ producto });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findOneAndDelete({ _id: req.params.id });

        if(!producto){
            res.json({mensaje: 'Producto no encontrado'});
            return next();
        }

        res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.buscarProducto = async (req, res, next) => {
    try {
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}
