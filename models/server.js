const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPATH = '/api/usuarios';
        this.authPATH = '/api/auth';

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
        
        this.app.use( this.usuariosPATH, require('../routes/user') ); 
        this.app.use( this.authPATH, require('../routes/auth') );
    }

    listen(){
        this.app.listen(this.port ,()=>{

            console.log(`Servidor corriendo en puerto ${this.port}`)
        })

    }



}

module.exports = Server;