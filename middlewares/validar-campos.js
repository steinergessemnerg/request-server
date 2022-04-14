const { validationResult } = require('express-validator');


const validarCampos = (req,res,next) =>{
    
    const errore = validationResult(req);
    if( !errore.isEmpty()){
        return res.status(400).json(errore);
    }
    next();
}


module.exports={
    validarCampos
}
