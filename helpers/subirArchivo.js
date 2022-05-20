const { response } = require("express");
const path = require("path");
const {v4: uuidv4 } =require("uuid");



const subirArchivo = (files , extenionesValidas = [ "png", "jpg", "jpeg", "gif","mp4"] , carpeta = ""  ) =>{

    return new Promise ( (resolve,reject) =>{

        const {archivo } = files;
        const nombreCortado= archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];
        
    
        if (!extenionesValidas.includes(extension)){
            reject (`La extension ${ extension} no es permitida rey`)
        }
    
        const nombreTemporal = uuidv4() + "." + extension;
        uploadPath = path.join( __dirname, '../uploads/' ,carpeta,  nombreTemporal);
        

        archivo.mv(uploadPath, function(err) {
            if (err) {
                reject(err);
             }
        
            resolve(nombreTemporal);

    
        });

    } )
  

}

module.exports = {
    subirArchivo
}