//Permite establecer las rutas
const { Router } = require('express');

const { 
  usuariosGet, 
  usuariosPost, 
  usuariosPut} = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet)
router.post('/', usuariosPost)
router.put('/:id/:nombre', usuariosPut)

module.exports = router;