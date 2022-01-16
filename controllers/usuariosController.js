const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(usuario.password, 10);

  try {
    await usuario.save();
    res.json({ mensaje: 'Usuario creado' });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error al registrar el usuario' });
  }
}

exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    await res.status(401).json({ mensaje: 'El usuario no existe' });
    next();
  } else {
    const match = await bcrypt.compareSync(password, usuario.password);

    if (!match) {
      await res.status(401).json({ mensaje: 'La contraseña es incorrecta' });
      next();
    } else {
      const token = jwt.sign({ 
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
      }, process.env.JWT_SECRET, { expiresIn: '24h' });

      res.json({ token });
    }
  }
}
