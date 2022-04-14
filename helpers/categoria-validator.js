const {Categoria} = require('../models/index');
const Usuario = require('../models/usuario');



const categoriaIs = async (categoria) =>{

    const categoraiTrue = await Categoria.findOne({nombre: categoria})
    if (!categoraiTrue)
    {
        return false
    }

    return true

}



module.exports = {

    categoriaIs
}