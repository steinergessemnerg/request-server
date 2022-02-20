const express = require('express');
var cors = require('cors');
class Server{

    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPATH = '/api/usuarios';
        // midledwares
        this.middledwares();
        //routes


        this.routes();
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

    }

    listen(){
        this.app.listen(this.port ,()=>{

            console.log(`Servidor corriendo en puerto ${this.port}`)
        })

    }



}

module.exports = Server;