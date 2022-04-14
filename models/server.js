const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.path ={
            usuarios:   '/api/usuarios',
            auth:       '/api/auth',
            categorias: '/api/categorias',
            productos:  "/api/productos",
            buscar:     "/api/buscar"

            
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
        this.app.use(cors());
        //para obetener de json
        this.app.use( express.json());
        
        this.app.use(  express.static('public') );
    }

    routes(){
        
        this.app.use( this.path.usuarios,   require('../routes/user') ); 
        this.app.use( this.path.auth ,      require('../routes/auth') );
        this.app.use( this.path.categorias ,require('../routes/categorias') );
        this.app.use( this.path.productos , require('../routes/productos') );
        this.app.use( this.path.buscar ,    require('../routes/buscar') );

    }

    listen(){
        this.app.listen(this.port ,()=>{

            console.log(`Servidor corriendo en puerto ${this.port}`)
        })

    }



}

module.exports = Server;