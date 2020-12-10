/*
Ruta: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizaUsuario, borrarUsuario } = require('../../controller/usuario/usuario');
const { check } = require('express-validator');
const { validarCampos } = require('../../middleware/validar-campos');
const { validaJWT } = require('../../middleware/validar-jwt');

//inicializamos el router
const router = Router();

// rutas para que jale en el explorador la raiz http://localhost:3000/
router.get('/', [
        validaJWT //no hay otra cosa asi puede aplicar o sin los []
    ],
    getUsuarios); //  se crea el archivo del controlador usuario y se utiliza la referencia de la funcion generada

// crear usuario
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos //debo llamar al final ela validcion del middleware
    ],
    crearUsuario); //  se crea el archivo del controlador usuario y se utiliza la referencia de la funcion generada
// actualizar usuario
router.put('/:id', [
        validaJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        //check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos //debo llamar al final ela validcion del middleware
    ],
    actualizaUsuario);

router.delete('/:id', validaJWT, borrarUsuario);



module.exports = router;