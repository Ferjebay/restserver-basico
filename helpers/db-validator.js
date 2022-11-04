const { Categoria, Usuario, Rol, Producto } = require('../models')

const esRolValido = async(rol = '') => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${ rol } no esta registrado en la base de datos`);
  }
}

const emailExiste = async ( correo ) =>{
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${ correo } ya se encuentra registrado`);
  }
}

const existeUsuarioPorID = async ( id ) =>{
  console.log(id);
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe: ${ id }`);
  }
}

const existeCategoria = async (nombre) => {    
  const query = { nombre: nombre.toUpperCase() }

  const result = await Categoria.findOne( query );

  if(result){
      throw new Error(`La categoria ${result.nombre} ya existe`);
  }
}

const existeProducto = async (nombre) => {    
  const query = { nombre: nombre.toUpperCase() }

  const result = await Producto.findOne( query );

  if(result){
      throw new Error(`El producto ${result.nombre} ya existe`);
  }
}

const existeCategoriaPorId = async (id) => {    
  const existeCategoria = await Categoria.findById( id );

  if(!existeCategoria){
      throw new Error(`No existe una categoria con id ${ id }`);
  }
}

const existeProductoPorId = async (id) => {    
  const existeProducto = await Producto.findById( id );

  if(!existeProducto){
      throw new Error(`No existe un producto con id ${ id }`);
  }
}

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorID,
  existeCategoria,
  existeCategoriaPorId,
  existeProducto,
  existeProductoPorId
}