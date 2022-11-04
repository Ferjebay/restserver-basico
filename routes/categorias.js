const { Router } = require('express')
const { check } = require('express-validator');

const { crearCategoria, getCategorias, getCategoriaById, actualizarCategoria, borrarCategoria } = require('../controllers/categoria');
const { existeCategoria, existeCategoriaPorId } = require('../helpers/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

// const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', getCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'No es un id de mongo valido').isMongoId(),
  check('id').custom( existeCategoria ),
  validarCampos
], getCategoriaById);

//crear actegoria - privado - cualquier persona con un token valido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria)

//actualizar categoria - privado - cualquier persona con token valido
router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( existeCategoria ),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
], actualizarCategoria);

//Borrar una categoria - Admin 
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id Valido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
], borrarCategoria);

module.exports = router;
