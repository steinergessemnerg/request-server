const { response } = require('express');

const isAdminRole = (req, res = response, next ) =>{

    if(!req.usuario) {
        return res.status(500).json({
            msg: "se quiere verificar el role sin validar el token primero"
        })
    }

    const {rol, nombre } = req.usuario;

    if (rol !== "ADMIN_USER")
    {
        res.status(401).json({
            msg: "Error - necesita privilegios elevados para hacer esto"
        })  ;
      }


    next();
}

const tieneRoles = ( ...roles ) =>{

    return ( req, res = response, next)  =>{

        if(!req.usuario) {
            return res.status(500).json({
                msg: "se quiere verificar el role sin validar el token primero"
            })
        }

        if( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `No tiene privilegios de ${roles}`
            })
        }
        console.log(roles)

        next();
    }

}


module.exports = {
    isAdminRole, tieneRoles
}