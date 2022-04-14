const { Router } = require('express');
const {check} = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('correo', 'Correo es obligatoio').notEmpty(),
    check("password", "Contrasea es obligatoria").notEmpty(),
    validarCampos
], login);


router.post('/google',[
        check('id_token','token es obligatorio').notEmpty(),
        validarCampos
    ], googleSignin);

module.exports = router