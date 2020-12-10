// Importamos el modelo del Usuario
const { response } = require('express'); //ayudara al manejo de la ayuda,me permite verla  al asignarlo a resp = response
const Usuario = require('../../model/usuario/usuario');
const encriptacion = require('bcryptjs'); //para el manejo de la encriptcion
const { generarJWT } = require('../../utils/jwt');


// Obtiene una lista de usuarios
const getUsuarios = async(req, resp = response) => {
    try {

        // let usuarioList = await Usuario.find(); m eregresa todos los campos de la bd
        let usuarioList = await Usuario.find({}, 'nombre email role google');
        resp.json({
            ok: true,
            msg: 'Consultando Usuarios!!',
            usuarios: usuarioList
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });

    }


}; // fin metodo

// Crea un usuario
const crearUsuario = async(req, resp = response) => {
    //dos formas de obtener la info del request
    let usuarioModel = new Usuario(req.body);
    const { nombre, password, email } = req.body;
    try {
        //1.- Verificamos si no existe el email debe ser unico espera aque se busque
        const emailUsuario = await Usuario.findOne({ email: email });
        if (emailUsuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado!!'
            });
        }
        //antes de guardar el uusario se debe encriptar la contraseña

        //generamos numero aleatorio
        const salt = encriptacion.genSaltSync(); //para no poner await que sea sync
        usuarioModel.password = encriptacion.hashSync(password, salt); //asigamos la contraseña encriptada
        //registramos  el usuario
        const userNew = await usuarioModel.save();
        //generacion del token -JWT
        const token = '';
        await generarJWT(usuarioModel.id)
            .then(respuesta => {
                this.token = respuesta;
            });


        resp.json({
            ok: true,
            usuario: usuarioModel,
            token: this.token
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });

    }


}; // fin metodo

// actualiza usuario
const actualizaUsuario = async(req, resp = response) => {
    try {
        const uid = req.params.id;
        const { email, password, google, ...campos } = req.body; //quitamos los 3 campos del objeto campos
        //verificamos que exista el usuario
        console.log('miuid==', uid);
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return resp.status(400).json({
                ok: false,
                msg: `El usuario con el id=${uid} no existe`
            });
        }
        //validamos que el correo no se inserte si ya existe
        if (usuarioBD.email != email) {
            const emailUsuario = await Usuario.findOne({ email: email });
            if (emailUsuario) {
                return resp.status(400).json({
                    ok: false,
                    msg: 'El correo ya esta registrado!!'
                });
            }
            campos.email = email;
        }

        //si no pongo el new: true me regresa el OBJETO  original sin la actualizacion
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        resp.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }

};

const borrarUsuario = async(req, resp = response) => {
    try {
        const uid = req.params.id;
        //verificamos que exista el usuario
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return resp.status(400).json({
                ok: false,
                msg: `El usuario con el id=${uid} no existe`
            });
        }
        //recordar que lo importante de un usuario seria cambiar un campo activo= a false mas que borrarlo 
        await Usuario.findByIdAndDelete(uid);

        resp.json({
            ok: true,
            msg: 'Usuario Eliminado!!'
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });

    }


};

// Exportamos metodos
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizaUsuario,
    borrarUsuario
};