const {Schema, model} =require('mongoose');
const categoria = require('./categoria');
const usuario = require('./usuario');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: usuario,
        required: true
    },
    precio:{
        type: Number,
        default: 0,      
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: categoria,
        required: true
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    }

    
})

ProductoSchema.methods.toJSON = function (){

    const { __v, estado, ...data } =this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema);