
const validarArchivoSubir = (req, res= Response, next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msg : 'No fueron encontrados archivos'
        });
        return;
    }

    next(); 

}

module.exports = {
    validarArchivoSubir
}