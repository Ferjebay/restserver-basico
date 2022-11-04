const { Router } = require('express'); //Permite establecer las rutas
const { check } = require('express-validator');

const { 
  esAdminRole, 
  tieneRole, 
  validarJWT, 
  validarCampos } = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validator');

const { 
  usuariosGet, 
  usuariosPost, 
  usuariosPut, 
  usuariosDelete } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

//Crear un nuevo usuario
router.post('/', [
  check('nombre', 'El campo nombre es obligatorio').not().isEmpty(), 
  check('correo', 'Debes ingresar un email valido').isEmail(), 
  check('password', 'El password debe ser de mas de 6 caracteres').isLength({ min: 6 }), 
  //check('rol', 'El rol no es valido').isIn(['ADMIN_ROL', 'USER_ROL']),
  check('correo').custom( emailExiste ),
  check('rol').custom( esRolValido ),
  validarCampos //verifica que no exista un error de los checks
], usuariosPost);

router.put('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( existeUsuarioPorID ),
  check('rol').custom( esRolValido ),
  validarCampos //verifica que no exista un error de los checks
], usuariosPut)

router.delete('/:id', [
  validarJWT,
  // esAdminRole,
  tieneRole('ADMIN_ROL'),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( existeUsuarioPorID ),
  validarCampos //verifica que no exista un error de los checks
], usuariosDelete)

module.exports = router;