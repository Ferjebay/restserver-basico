const { Router } = require('express')
const { check } = require('express-validator');

const { 
  crearProducto, 
  getProductos, 
  getProductoById, 
  actualizarProducto, 
  borrarProducto } = require('../controllers/productos');
  
const { existeProducto, existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', getProductos);

//Obtener un producto por id - publico
router.get('/:id', [
  check('id', 'No es un id de mongo valido').isMongoId(),
  check('id').custom( existeProducto ),
  validarCampos
], getProductoById);

//crear actegoria - privado - cualquier persona con un token valido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( existeProducto ),
  check('categoria', 'La categoria es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id valido').isMongoId(),
  check('categoria').custom( existeCategoriaPorId ),
  validarCampos
], crearProducto)

//actualizar producto - privado - cualquier persona con token valido
router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( existeProducto ),
  check('categoria', 'La categoria es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id valido').isMongoId(),
  check('categoria').custom( existeCategoriaPorId ),
  validarCampos
], actualizarProducto);

//Borrar una categoria - Admin 
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id Valido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], borrarProducto);

module.exports = router;
