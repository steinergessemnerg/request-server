const categoriaValidator = require("./categoria-validator");
const productoValidator = require("./producto-validaror");
const googleVerify = require("./google-verify");
const generarJWT= require("./generar-jwt");
const dbValidator = require("./db-validators");
const subirArchivo = require("./subirArchivo");


module.exports = {
    ...categoriaValidator,
    ...productoValidator,
    ...googleVerify,
    ...generarJWT,
    ...dbValidator,
    ...subirArchivo
}