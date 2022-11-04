const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
  
  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      usuarios:   '/api/usuarios',
      buscar:     '/api/buscar',
      auth:       '/api/auth',
      categorias: '/api/categorias',
      productos:  '/api/productos'
    }

    this.conectarBD();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  middlewares(){
    //Lectura y parseo del body
    this.app.use( express.json() );

    //CORS
    this.app.use( cors() );

    this.app.use( express.static('public') );
  }

  conectarBD(){
    dbConnection();
  }

  routes(){
    this.app.use(this.paths.usuarios, require('../routes/user'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
    this.app.use(this.paths.productos, require('../routes/productos'));
  }

  listen(){
    this.app.listen( this.port , () => {
      console.log(`Example app listening on port ${ this.port }`)
    })
  }

}

module.exports = Server