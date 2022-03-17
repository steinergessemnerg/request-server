const { Router } = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', [
    check('correo', 'Correo es obligatoio').notEmpty(),
    check("password", "Contrasea es obligatoria").notEmpty(),
    validarCampos
], login);


module.exports = router