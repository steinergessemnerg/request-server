const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  validarisRoles  = require('../middlewares/validar-role');


module.exports={

    ...validarCampos, ...validarJWT, ...validarisRoles

}