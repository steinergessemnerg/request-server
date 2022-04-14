const {Router} = require("express");
const { buscar } = require("../controllers/buscar");

const router = Router();

module.exports = router;


router.get("/:coleccion/:termino", buscar);