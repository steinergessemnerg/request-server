const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  validarisRoles  = require('../middlewares/validar-role');
const validarArchivoSubir = require('../middlewares/validar-archivo');


module.exports={

    ...validarCampos, ...validarJWT, ...validarisRoles, ...validarArchivoSubir

}