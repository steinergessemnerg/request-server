const {Schema, model} =require('mongoose');


const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo:{
        type: String,
        required:  [true, 'El correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es requerido']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        default: 'USER_USER',
        enum: ['ADMIN_USER','USER_USER','VENTAS_USER']
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false
    }



});

UsuarioSchema.methods.toJSON = function (){

    const { __v, _id,  password, ...usuario } =this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports= model('Usuario', UsuarioSchema);