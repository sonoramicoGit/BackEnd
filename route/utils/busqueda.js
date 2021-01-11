/*
Ruta: /api/busqueda
*/
const { Router } = require("express");
const { getBusquedaTotal, getBusquedaCollection } = require("../../controller/utils/busqueda");
const { validarCampos } = require("../../middleware/validar-campos");
const { validaJWT } = require("../../middleware/validar-jwt");

const router = Router();
router.get('/:criterio', [
        validaJWT,
    ],
    getBusquedaTotal);
router.get('/collection/:tabla/:criterio', [
        validaJWT,
    ],
    getBusquedaCollection);
//exportamos router
module.exports = router;