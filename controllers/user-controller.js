const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = async (req = request,res = response) => {
    
    const { limite = 2, desde = 0} = req.query;
    const query = { estado : true };

    const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));
    
    const total = await Usuario.countDocuments(query);
    res.json({
        msg : 'GET - api Controller',
        total,
        usuarios
    });

}

const usuariosPost = async(req = request, res = response) => {


    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    const salt = bcrypt.genSaltSync();

    // encrypt pass
    usuario.password = bcrypt.hashSync( password, salt);


    await usuario.save();
    
        res.json({
            msg : 'POST - api controller',
            usuario,
        });
}

const usuariosPut = async(req, res = response) => {
    
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    //Todo validar con BD
    if (password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg : 'PUT - api controller',
        id,
        resto
    });
}
const usuariosdelete = async (req, res = response) => {

    const {id} = req.params;
    const uid = req.uid;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario;
    res.json({
        msg : 'Delete - api controller',
        usuario,
        usuarioAutenticado
    });
}


module.exports = {
usuariosGet, usuariosPost,usuariosPut,usuariosdelete

}