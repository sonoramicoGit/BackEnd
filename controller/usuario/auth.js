const { response } = require('express'); //ayudara al manejo de la ayuda,me permite verla  al asignarlo a resp = response
const Usuario = require('../../model/usuario/usuario');
const bcrypt = require('bcryptjs'); //para el manejo de la encriptcion
const { generarJWT } = require('../../utils/jwt');


const login = async(req, resp = response) => {
    const { email, password } = req.body;
    try {

        const usuarioBD = await Usuario.findOne({ email });

        if (!usuarioBD) {
            return resp.status(400).json({
                ok: false,
                msg: 'El email no existe!!'
            });
        }
        //verificamos contraseña 
        const validaPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validaPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'El password es incorrecto!!'
            });
        }
        //generaremos el token-JWT

        //const token = await generarJWT(usuarioBD.id);
        const token = '';
        await generarJWT(usuarioBD.id)
            .then(respuesta => {
                // console.log('la respuesta', respuesta);
                this.token = respuesta;
            });

        resp.json({
            ok: true,
            token: this.token

        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'

        });
    }

}

module.exports = {
    login
};