const { response } = require("express");
const match = require("nodemon/lib/monitor/match");
const { categoriaIs } = require("../helpers/categoria-validator");
const { Usuario, Categoria, Producto } = require("../models");
const categoria = require("../models/categoria");
const {ObjectId} = require("mongoose").Types;

const coleccionPermitidas = [
    "usuarios",
    "categorias",
    "productos",
    "roles",
]

const buscarUsuario = async (termino, res= response) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, "i");
    const usuario = await Usuario.find({
        $or: [{nombre: regex }, {correo: regex}],
        and: [ {estado: true}]

    });

    res.json({
        results: usuario
    })
}

const buscarCategoria = async (termino, res=response) =>{
    
    const regex = new RegExp(termino, "i"); 

    const categoria = await Categoria.find({
        $or: [{nombre: regex, estado: true}]
    })

    res.status(200).json({
        categoria
    })
}

const buscarProductos= async(termino, res=response) =>{


    const regex = new RegExp(termino, "i"); 
    console.log(regex);
    if ( await categoriaIs(termino) )
    {
        const productosByCategoria = await Producto.aggregate([
            {
                $lookup:{
                    from: "categorias",
                    localField: "categoria",
                    foreignField: "_id",
                    as: "grupos"
                }
            },
            {
                $match:{ "grupos.nombre":termino}
            },
            // {
            //     $replaceRoot: {
            //         newRoot: { $mergeObjects:[{$arrayElemAt:[ "$grupos",0]}, "$$ROOT"]
            //         }
            //     }
            // },
            {
                 $project: {
                     nombre_producto: "$nombre",
                     estado_producto: "$estado",
                    usuario:1,
                    precio:1,
                    categoria: termino,
                     disponible: 1,      
                 }
            },
            
           
            
        
        ])
    
        return res.status(200).json({
           "Resultados by Categoria": productosByCategoria
        })
    }
    const productos = await Producto.find({
        $or: [{nombre: regex, estado:true}]
        
    })

     

    res.status(200).json({
        productos
    })

}

const buscar = (req, res= response)=>{

    const {coleccion, termino} = req.params;

    if (!coleccionPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg : `La coleccion  ${coleccion} no esta en las permitidas`
        })
    }

    switch (coleccion) {
        case "usuarios":
            buscarUsuario(termino, res);
            break;
        case "categorias":
            buscarCategoria(termino,res)
            break;
        case "productos":
            buscarProductos(termino,res)
            break;
        default:
            res.status(500).json({
                msg: "Se le olvido hacer esta busqueda "
            })
            break;
    }
}

module.exports = {
    buscar
}