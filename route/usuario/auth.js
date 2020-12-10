/*
Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../../controller/usuario/auth');
const { validarCampos } = require('../../middleware/validar-campos');

//iniciamos la instancia router 
const router = Router();


router.post('/', //ruta 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos //middleware
    ],
    login); //controlador


//exportamos
module.exports = router;