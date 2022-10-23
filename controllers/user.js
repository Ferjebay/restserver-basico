const { response } = require('express');


const usuariosGet = (req, res = response) => {
  res.json({
    msg: ' usuarios get - controlador'
  });
}

const usuariosPost = (req, res = response) => {

  const { nombre, edad } = req.body

  res.json({
    nombre,
    edad 
  });
}

const usuariosPut = (req, res = response) => {

  const { id, nombre } = req.params

  res.json({
    id,
    nombre
  });
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut
}

