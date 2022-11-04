const { Router } = require('express')
const { check } = require('express-validator');

const { buscar } = require('../controllers/buscar');

const router = Router();

//Obtener una categoria por id - publico
router.get('/:coleccion/:termino', buscar);

module.exports = router;
