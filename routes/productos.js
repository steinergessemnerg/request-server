const { Router } = require('express');
const {check} = require('express-validator');
const res = require('express/lib/response');
const { obtenerProducto, obtenerProductos, actualizarProducto, crearProducto, borrarProducto } = require('../controllers/productos');
const { existCategoriaId, existProductoId } = require('../helpers/db-validators');
const { productIs } = require('../helpers/producto-validaror');
const { isAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', obtenerProductos );

router.get('/:id', [
     check('id', "No es un id Valido").isMongoId(),
     check("id").custom( existProductoId ),
     validarCampos
 ], obtenerProducto);

 router.put('/:id', [
     validarJWT,
     check('id', "No es un id Valido").isMongoId(),
     check("id").custom( existProductoId ),
     validarCampos
 ], actualizarProducto);


 router.post('/', [
     validarJWT,
     check('nombre','Es requerido el nombre del producto ').notEmpty(),
     check("categoria","no es un ID  valido ").isMongoId(),
     check("categoria").custom(existCategoriaId),

     validarCampos
 ], crearProducto);

 router.delete('/:id', [
     validarJWT,
     isAdminRole,
     check("id", "No es un id valido de MONGO").isMongoId(),
     check('id').custom(existProductoId),
     validarCampos
 ], borrarProducto );



module.exports = router