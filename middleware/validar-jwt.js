const { response } = require("express");
const jwt = require("jsonwebtoken");

const validaJWT = (req, resp = response, next) => {
    const token = req.header('x-token');
    console.log('token::', token);

    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion!!'
        });
    }

    //verificamos el token
    try {
        const { uid } = jwt.verify(token, process.env.TOKEN_KEY);
        console.log('uidValida', uid);
        //si yo quisiera agregar el Uid lo meto al request req.uid=uid  y usarlo mas adelante de mi flujoy 
        //si quiero presentarlo en la info de los usuarios
        req.uid = uid;
        next();
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token no valido !!'
        });

    }

};
module.exports = {
    validaJWT
};