const {response, request} = require('express');


const usuariosGet = (req = request,res = response) => {
    
    const {nombre ="peter", apellido,edad} = req.query
    
    res.json({
        msg : 'GET - api Controller',
        nombre,apellido,edad
    });

}

const usuariosPost = (req = request, res = response) => {

    const body = req.body;
    
        res.json({
            msg : 'POST - api controller',
            body,
        });
}

const usuariosPut = (req, res = response) => {
    
    const {id} = req.params;
    
    res.json({
        msg : 'PUT - api controller',
        id,
    });
}
const usuariosdelete = (req, res = response) => {
    res.json({
        msg : 'Delete - api controller'
    });
}


module.exports = {
usuariosGet, usuariosPost,usuariosPut,usuariosdelete

}