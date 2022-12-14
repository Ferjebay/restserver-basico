const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {
        //podria grabar demas datros: nombres, rol, telefono...
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT
}