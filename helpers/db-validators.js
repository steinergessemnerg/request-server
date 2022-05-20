const { Categoria, Producto } = require('../models');
const role = require('../models/role');
const Usuario = require('../models/usuario');
const  existRolValidate = async( rol = 'nada') => {

    const existeRol = await role.findOne({rol})
    if (!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}


const existEmail = async (correo) =>{

    const correoExist = await Usuario.findOne({correo})
    if (correoExist)
    {
        throw new Error(`El correo ya existe `);
    }


}

const existUserId = async (id) =>{

    const exist = await Usuario.findById(id)
    if (!exist)
    {
        throw new Error ('El usuario no existe');
    }
}

const existCategoriaId = async (id)=>{

    const exist = await Categoria.findById(id);
    if (!exist)
    {
        throw new Error ("El id categoria no existe");
    }

}

const existProductoId= async(id)=>{
    const exist = await Producto.findById(id);
    if (!exist)
    {
        throw new Error ("El id Producto no existe");
    }
}

const collectionPermitida = async(colecion="", colecciones=[]) =>{


    const incluida = colecciones.includes(colecion);

    if (!incluida){
        throw Error (`la ${colecion} no esta permitida : ${colecciones}`);
    }
    return true;
}

module.exports = {

    existRolValidate, existEmail, existUserId, existCategoriaId, existProductoId,collectionPermitida
}