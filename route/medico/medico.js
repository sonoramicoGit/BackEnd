/*
Ruta: /api/hospital
*/

const { Router } = require('express');
const { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../../controller/medico/medico');
const { check } = require('express-validator');
const { validarCampos } = require('../../middleware/validar-campos');
const { validaJWT } = require('../../middleware/validar-jwt');

//inicializamos el router
const router = Router();

//Consultar Medicos
router.get('/', [], getMedico); //  se crea el archivo del controlador usuario y se utiliza la referencia de la funcion generada

// crear Medico
router.post('/', [
        validaJWT,
        check('id_hospital', 'El id_hospital es obligatorio').not().isEmpty(),
        check('id_hospital', 'El id_hospital debe ser valido').isMongoId(),
        validarCampos

    ],
    crearMedico); //  se crea el archivo del controlador usuario y se utiliza la referencia de la funcion generada

// actualizar Medico
router.put('/:id', [
        validaJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        check('id_hospital', 'El id_hospital es obligatorio').not().isEmpty(),
        check('id_hospital', 'El id_hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico);

router.delete('/:id', [], borrarMedico);



module.exports = router;