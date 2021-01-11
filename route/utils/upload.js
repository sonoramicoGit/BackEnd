/*
Ruta: /api/upload
*/
const { Router } = require("express");
const { uploadFile, retornaImagen } = require("../../controller/utils/upload");
const { validaJWT } = require("../../middleware/validar-jwt");

//subir archivos
const fileUpload = require('express-fileupload');

const router = Router();

// default options se pone antes de obtenerlo del req
router.use(fileUpload()); //podemos usar el router o ene l index el servExpres es lommismo
router.put('/:tipo/:id', [
        validaJWT,
    ],
    uploadFile);
router.get('/:tipo/:foto', retornaImagen); //sin validacion del token opcional
//exportamos router
module.exports = router;