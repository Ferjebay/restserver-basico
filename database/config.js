const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log("Conexion exitosa a la base de datos");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectarse a la BD");
  }
}

module.exports = {
  dbConnection
}