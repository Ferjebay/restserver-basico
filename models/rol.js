const { Schema, model } = require('mongoose')

const rolSchema = new Schema({
  rol: {
    type: String,
    required: [ true, 'El rol es requerido']
  }
});
//le aumenta ka s moongose
module.exports = model('Role', rolSchema)

