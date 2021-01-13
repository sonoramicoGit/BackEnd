//ARCHIVO CREADO PARA LA ENCIPTACION DEL TOKEN MEDINATE EL ALGORITMO JWT

//librerias
const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    //se genera una promesa(asyncrona) para poder manejarla con el await wen su llamada ya que es un proceso que debe esperar
    //a que se ejecute y no continuar el proceso sin antes autenticar
    const promesa = new Promise((resolve, reject) => {
        const payLoad = {
            uid: uid
        };
        jwt.sign(payLoad, process.env.TOKEN_KEY, { expiresIn: "1h" },
            (error, token) => {
                if (error) {
                    console.log(error);
                    resolve('Error::No se pudo generar el JWT');
                } else {
                    console.log('token::::', token);
                    resolve(token);
                }

            });
    });
    return promesa;



};
module.exports = {
    generarJWT
};