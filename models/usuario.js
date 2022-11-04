const { Schema, model } = require('mongoose')

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [ true, 'El nombre es requerido']
  },
  correo: {
    type: String,
    unique: true,
    required: [ true, 'El correo es requerido' ]
  },
  password: {
    type: String,
    required: [ true, 'La contraseña es requerido' ]
  },
  password: {
    type: String
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROL', 'USER_ROL']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
});

UsuarioSchema.methods.toJSON = function(){
  const { __v, password, _id,  ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}

//le aumenta la s moongose
module.exports = model('Usuario', UsuarioSchema)

