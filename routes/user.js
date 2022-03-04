const { Router } = require('express');
const {check} = require('express-validator');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosdelete } = require('../controllers/user-controller');
const { existRolValidate, existEmail, existUserId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const role = require('../models/role');

const router = Router();


router.get('/', usuariosGet);
router.post('/',[
        check('nombre' ,'El usuario no es valido').notEmpty(),
        check('password' ,'El password debe de ser mayor de 6 letras').isLength({min:6}),
        check('correo' ,'El correo no es valido').isEmail(),
        check('rol').custom( existRolValidate ),
        check('correo').custom(existEmail),
        validarCampos
        
        
],usuariosPost );
router.put('/:id', [ 
        check('id', 'No es un id valido').isMongoId(),
        check('id', 'No existe user').custom(existUserId),
        validarCampos
], usuariosPut);

router.delete('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id', 'No existe user').custom(existUserId),
        validarCampos 


], usuariosdelete);

module.exports = router;