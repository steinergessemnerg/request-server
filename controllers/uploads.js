const {response, request} = require('express');
const res = require('express/lib/response');
const { status } = require('express/lib/response');
const { subirArchivo } = require('../helpers');
const path = require('path');
const fs = require('fs');
const {Usuario, Producto} = require('../models');
const { fstat } = require('fs');



const upFile = async (req, res=response) =>{

    try {
        //imagenes
    const nombre = await subirArchivo(req.files,undefined, "imgs" );

        res.json({
            nombre
        })
    }catch(msg){
        res.status(400).json({msg});
    }

}


const updatePicture= async( req, res= response,) =>{

    const {id, collection} = req.params;
    let modelo;
    switch (collection){
        case "usuarios":
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existge este id en usuaruis wach`
                })
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existge este id en produtos wach`
                })
            }
            break;

            default: 
            return res.status(501).json({msg: "Se me olvido validar esto mlda"});
    }
    
    if (modelo.img){

        const pathImagen =  path.join(__dirname, '../uploads', collection, modelo.img);
        if( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, collection); 
    modelo.img = nombre;

    await modelo.save();
    
    res.json({
       modelo
    })


}


const ShowPicture = async (req,res= response) => {

    const {id, collection} = req.params;
    let modelo;
    switch (collection){
        case "usuarios":
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existge este id en usuaruis wach`
                })
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existge este id en produtos wach`
                })
            }
            break;

            default: 
            return res.status(501).json({msg: "Se me olvido validar esto mlda"});
    }
    
    if (modelo.img){

        const pathImagen =  path.join(__dirname, '../uploads', collection, modelo.img);
        console.log(pathImagen);
        if( fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }

    res.json({

        msg: 'Falta placeholer'
    })
    
}





module.exports= {
    upFile,
    updatePicture,
    ShowPicture
}