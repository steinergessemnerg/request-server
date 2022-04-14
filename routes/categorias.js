const { Router } = require('express');
const {check} = require('express-validator');
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existCategoriaId } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',  obtenerCategorias);

router.get('/:id', [
    check('id', "No es un id Valido").isMongoId(),
    check("id").custom(existCategoriaId),
    validarCampos
], obtenerCategoria);

router.put('/:id', [
    validarJWT,
    check('nombre','Es requerido el nombre de la categoria').notEmpty(),
    validarCampos
], actualizarCategoria);


router.post('/', [
    validarJWT,
    check('nombre','Es requerido el nombre de la categoria').notEmpty(),

    validarCampos
], crearCategoria);

router.delete('/:id', [
    validarJWT,
    isAdminRole,
    check("id", "No es un id valido de MONGO").isMongoId(),
    check('id').custom(existCategoriaId),
    validarCampos
], borrarCategoria );



module.exports = router