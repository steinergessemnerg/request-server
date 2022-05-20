const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require("express-fileupload");
class Server{

    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.path ={
            usuarios:   '/api/usuarios',
            auth:       '/api/auth',
            categorias: '/api/categorias',
            productos:  "/api/productos",
            buscar:     "/api/buscar",
            upFile:     "/api/uploads"

            
        };

        // conectar bs
        this.conectbd();

        // midledwares
        this.middledwares();
        //routes


        this.routes();
    }

    async conectbd (){

        await dbConnection();
    }

    middledwares(){
        //midleware

        // para bloqueo de nevegadores
        this.app.use(cors());


        //para obetener de json
        this.app.use( express.json());
        
        //para usar public
        this.app.use(  express.static('public') );

        //para carga de archivos
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp",
            createParentPath: true
        }))
    }

    routes(){
        
        this.app.use( this.path.usuarios,   require('../routes/user') ); 
        this.app.use( this.path.auth ,      require('../routes/auth') );
        this.app.use( this.path.categorias ,require('../routes/categorias') );
        this.app.use( this.path.productos , require('../routes/productos') );
        this.app.use( this.path.buscar ,    require('../routes/buscar') );
        this.app.use( this.path.upFile ,    require('../routes/uploads') );

    }

    listen(){
        this.app.listen(this.port ,()=>{

            console.log(`Servidor corriendo en puerto ${this.port}`)
        })

    }



}

module.exports = Server;