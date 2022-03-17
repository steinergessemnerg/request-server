const bcryptjs = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const {response } = require ('express');
const res = require('express/lib/response');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async (req,res =  response) =>{

    const { correo, password } = req.body;

    try {
        
        const usuario  =  await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({

                "msg": "Correo o password no existe - correo"
            })
        }

        if (!usuario.estado ){
            return res.status(400).json({

                "msg": "Correo o password no existe - estado: false"
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {

            return res.status(400).json({
                "msg": "Correo o  password incorrecto - password invalid"
            })
        } 

        const token = await generarJWT(usuario.id, );

        res.json({
            usuario,
            token
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg": "Habla con el administrador"
        })
    }

    

}

module.exports = {

    login
}