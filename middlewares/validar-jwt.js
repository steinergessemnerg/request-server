const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = async  (req=request, res= response, next) => {

    const token = req.header('x-token');

    if (!token){
        res.status(401).json({
            "msg": "No hay token" 
        })
    }
    console.log(token);

    try {
        
        const { uid } = jwt.verify(token, process.env.KEY_PUBLIC_SECRET);
        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return res.status(401).json({
                "msg": 'Token no valido - user no existe'
            })
        }
        if (!usuario.estado){
            return res.status(401).json({
                "msg": 'Token no valido - user estado false'
            })
        }

        req.usuario = usuario;
        req.uid = uid;
        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        })
    }
   



}


module.exports = {
    validarJWT
}