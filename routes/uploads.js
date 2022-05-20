const { Router } = require('express');
const {check} = require('express-validator');
const { upFile, updatePicture, ShowPicture } = require('../controllers/uploads');
const { collectionPermitida } = require('../helpers');
const { validarCampos, validarJWT, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/',validarArchivoSubir,  upFile );

router.put('/:collection/:id',[
     validarArchivoSubir,
     check("id","no es un id valido de mongo").isMongoId(),
     check("collection").custom(c => collectionPermitida(c, ["usuarios","productos"])),
     validarCampos
], updatePicture);


router.get('/:collection/:id',[
     check("id","no es un id valido de mongo").isMongoId(),
     check("collection").custom(c => collectionPermitida(c, ["usuarios","productos"])),
     validarCampos

], ShowPicture );

module.exports = router