const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') =>{

    return new Promise((resolve, reject ) => 
    {
        const payload = { uid };

        jwt.sign(payload, process.env.KEY_PUBLIC_SECRET,  { expiresIn : '4h'},
         (err, token) =>{ 
             if (err){

                 console.log(err + " CODE ERROR");
                 reject('No se pudo generar el token');

             }else {
                 
                 resolve(token);
             }
         });
    })

}

module.exports = {

    generarJWT
}