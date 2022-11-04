const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        }); 
    }

    try {
        const {
            uid
        } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario que corresponde el id
        const usuarioAuth = await Usuario.findById(uid);

        if (!usuarioAuth) {
            return res.status(401).json({ msg: 'token no valido - usuario no existe en la BD' })
        }

        //Verificar si el uid tiene estado true
        if (!usuarioAuth.estado) {
            return res.status(401).json({ msg: 'token no valido - usuario inactivo' });
        }
        /*
          IMPORTANTE
          AQUI GUARDA INfO DEL USER QUE ESTA NAVEGANDO
         */
        req.usuarioAuth = usuarioAuth;
        next();        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}

module.exports = {
    validarJWT
}