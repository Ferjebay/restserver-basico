const { response } = require("express");

const { Categoria } = require('../models')

//Obtener categorias - paginado - populate
const getCategorias = async (req, res= response) => {
  const { limite=5, desde=0 } = req.query;

  const query = { estado: true };

  const [categorias, total] = await Promise.all([
      Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite)) 
      .populate('usuario', ['nombre', 'correo']),
      Categoria.countDocuments(query)
  ]);

  res.json({
      categorias,
      total
  })
}

const getCategoriaById = async (req, res=response) => {
  const id = req.params.id
  
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
  res.status(200).json( categoria )
}

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  
  //Verificar si no existe una categoria con el mismo nombre
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({ msg: `La categoria ${ categoriaDB.nombre } ya existe` });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuarioAuth._id
  }

  const categoria = new Categoria( data );
  await categoria.save();

  res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res=response) => {
  const id = req.params.id;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuarioAuth._id;
  // *{new: true} : envia el nuevo documento actualizado
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json( categoria );
}

const borrarCategoria = async (req, res=response) => {    

  const id = req.params.id;

  const categoria = await Categoria.findByIdAndUpdate(id, {estado: false})

  res.json(categoria)
}

module.exports = {
  actualizarCategoria,
  borrarCategoria,
  crearCategoria,
  getCategorias,
  getCategoriaById
}