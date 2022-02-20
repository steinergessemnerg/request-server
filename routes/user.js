const { Router } = require('express');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosdelete } = require('../controllers/user-controller');

const router = Router();


router.get('/', usuariosGet);
router.post('/',usuariosPost );
router.put('/:id', usuariosPut);
router.delete('/', usuariosdelete);

module.exports = router;