const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true }

  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(desde)
    .limit(Number(limit))
  ])

  res.json({
    total,
    usuarios
  });
}

const usuariosPost = async(req, res = response) => {

  const { nombre, correo, rol, password } = req.body;

  const usuario = new Usuario({ nombre, correo, rol, password });
  
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar Usuario
  await usuario.save();

  res.json({ usuario });
}

const usuariosPut = async(req, res = response) => {

  const { id } = req.params
  const { _id, google, password, correo, ...rest } = req.body; //extraer campos 

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest);

  res.json({
    id,
    usuario
  });
}

const usuariosDelete = async(req, res = response) => {

  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    id,
    usuario
  });
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}

