const { response } = require("express");

const { Producto } = require('../models')

//Obtener categorias - paginado - populate
const getProductos = async (req, res= response) => {
  const { limite=5, desde=0 } = req.query;

  const query = { estado: true };

  const [productos, total] = await Promise.all([
      Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite)) 
      .populate('usuario', ['nombre', 'correo']),
      Producto.countDocuments(query)
  ]);

  res.json({
      productos,
      total
  })
}

const getProductoById = async (req, res=response) => {
  const id = req.params.id
  
  const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');;
  res.status(200).json( producto )
}

const crearProducto = async (req, res = response) => {
  const body = req.body;
  
  //Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuarioAuth._id
  }

  const producto = new Producto( data );
  await producto.save();

  res.status(201).json( producto );
}

const actualizarProducto = async (req, res=response) => {
  const id = req.params.id;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();        
    }

    data.usuario = req.usuarioAuth._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json( producto );
}

const borrarProducto = async (req, res=response) => {    

  const id = req.params.id;

  const producto = await Producto.findByIdAndUpdate(id, {estado: false})

  res.json( producto )
}

module.exports = {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  getProductos,
  getProductoById
}