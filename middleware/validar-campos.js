const { response } = require('express');
const { validationResult } = require('express-validator'); //resultado de la validacion

const validarCampos = (req, resp = response, next) => {

    //verificamos si se dispararon errores de validacion
    const errores = validationResult(req);
    //console.log(errores);
    if (!errores.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next(); // sino se manda no sale de este metodo
};
module.exports = {
    validarCampos
}