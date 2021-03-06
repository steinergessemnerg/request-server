const bcryptjs = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const {response } = require ('express');
const res = require('express/lib/response');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify} = require('../helpers/google-verify');
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


const googleSignin = async(req,res=response) =>{

  const { id_token } = req.body;
  try {
  const { correo, img, nombre} = await googleVerify(id_token);

  let usuario = await Usuario.findOne({correo});
  if (!usuario ){

    const data = {
    
        nombre,
        correo,
        password: ';d',
        img,
        google: true,

    };

    usuario = new Usuario(data);
    await usuario.save();
  }else{
     return  res.json({
          msg:"Usuario ya esta registrado"
      })
  }

   if(!usuario.estado){
       return res.status(401).json({
           msg: "Hable con administrador - Usuario Bloqueado",
          
       })
   }

  const token = await generarJWT(usuario.id)
  
    
    res.json({
       usuario
    })

  } catch (error) {
  
    console.log(error);
     res.status(400).json({
         msg: "Token no es reconocido",
        error
     })
  }
  
}

module.exports = {

    login,googleSignin
}