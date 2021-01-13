/*
Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogleSignIn, renovarToken } = require('../../controller/usuario/auth');
const { validarCampos } = require('../../middleware/validar-campos');
const { validaJWT } = require('../../middleware/validar-jwt');

//iniciamos la instancia router 
const router = Router();


router.post('/', //ruta 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos //middleware
    ],
    login); //controlador

router.post('/google', [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos //middleware
    ],
    loginGoogleSignIn); //controlador

router.get('/renovarToken', [
        validaJWT //no hay otra cosa asi puede aplicar o sin los []

    ],
    renovarToken); //controlador

//exportamos
module.exports = router;