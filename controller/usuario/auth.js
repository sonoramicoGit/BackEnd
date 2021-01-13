const { response } = require('express'); //ayudara al manejo de la ayuda,me permite verla  al asignarlo a resp = response
const Usuario = require('../../model/usuario/usuario');
const bcrypt = require('bcryptjs'); //para el manejo de la encriptcion
const { generarJWT } = require('../../utils/jwt');
const { googleVerify } = require('../../utils/google-verify');


const login = async(req, resp = response) => {
    const { email, password } = req.body;
    try {

        const usuarioBD = await Usuario.findOne({ email });
        console.log('usuarioBD:', usuarioBD);
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

};

const loginGoogleSignIn = async(req, resp = response) => {
    const { token } = req.body;
    try {

        let { name, email, picture } = await googleVerify(token);
        //Valida la existencia del usuario si existe se sobreescribe ,si no se crea
        let usuarioDB = await Usuario.findOne({ email });

        let usuario;

        if (!usuarioDB) {
            console.log('emntrando nuevo');
            usuario = new Usuario({
                nombre: name,
                password: '1111', // no cremaos su autenticacion encriptada
                email: email,
                img: picture,
                google: true
            });


        } else {
            console.log('ya existe');
            usuario = usuarioDB;
            usuario.google = true;
            //  usuario.password = '1234' //NO pierde su autenticacion por login normal

        }

        //guardar en bd
        console.log('salvando..');
        await usuario.save();

        console.log('generadno token..');
        const tokenJWT = await generarJWT(usuario.id);

        console.log('exito..');
        resp.json({
            ok: true,
            msg: 'Google Signin',
            token: tokenJWT

        });
    } catch (error) {
        console.log('Error::', error);
        resp.status(401).json({
            ok: false,
            msg: 'El Token no es correcto'

        });

    }


};

module.exports = {
    login,
    loginGoogleSignIn
};