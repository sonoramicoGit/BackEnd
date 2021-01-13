/*
Ruta: /api/hospital
*/

const { Router } = require('express');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../../controller/hospital/hospital');
const { check } = require('express-validator');
const { validarCampos } = require('../../middleware/validar-campos');
const { validaJWT } = require('../../middleware/validar-jwt');
//inicializamos el router
const router = Router();

//Consultar Hospitales
router.get('/', [], getHospitales); //  se crea el archivo del controlador usuario y se utiliza la referencia de la funcion generada

// crear Hospital
router.post('/', [
        validaJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(), //aqui validamos
        validarCampos // aqui si hay validos campos retornamos
    ],
    crearHospital); //  se crea el archivo del controlador usuario y se utiliza la referencia de la funcion generada

// actualizar Hospital
router.put('/:id', [
        validaJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(), //aqui validamos
        validarCampos //debo llamar al final ela validcion del middleware
    ],
    actualizarHospital);

router.delete('/:id', [], borrarHospital);



module.exports = router;