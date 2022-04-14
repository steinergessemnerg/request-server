const {Producto} = require('../models/index');
const Usuario = require('../models/usuario');



const productIs = async (producto) =>{

    const productoTrue = await Producto.findOne({producto})
    if (!productoTrue)
    {
        throw new Error(`La ID producto  no existe `);
    }

}



module.exports = {

    productIs
}