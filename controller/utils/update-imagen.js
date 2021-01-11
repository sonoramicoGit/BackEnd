const { response } = require("express");
const Medico = require("../../model/medico/medico");
const Usuario = require("../../model/usuario/usuario");
const Hospital = require("../../model/hospital/hospital");

const fs = require('fs'); //paquete propio de node filesystem

const updateImagen = async(nombreTabla, uid, nombreArchivo) => {
    //console.log('vamos bien!!', [nombreTabla, uid, path, nombreArchivo]);
    let campos = {};
    let usuarioBD = {};
    //verificamos si existe la imagen
    let pathViejo = ``;
    switch (nombreTabla) {
        case 'usuarios':
            const usuarioBD = await Usuario.findById(uid);
            if (!usuarioBD) {
                return false;
            }
            campos = {
                img: nombreArchivo
            };

            //verificamos si existe la imagen
            pathViejo = `./uploads/usuarios/${usuarioBD.img}`;
            if (fs.existsSync(pathViejo)) {
                console.log('éxiste pathviejo---->', pathViejo);
                //se borra la imagen anterior
                fs.unlinkSync(pathViejo);
            }
            //si no pongo el new: true me regresa el OBJETO  original sin la actualizacion
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

            break;
        case 'medicos':
            const medicoBD = await Medico.findById(uid);
            if (!medicoBD) {
                return false;
            }
            campos = {
                img: nombreArchivo
            };
            //verificamos si existe la imagen
            pathViejo = `./uploads/medicos/${medicoBD.img}`;

            if (fs.existsSync(pathViejo)) {
                console.log('éxiste pathviejo---->', pathViejo);
                //se borra la imagen anterior
                fs.unlinkSync(pathViejo);
            }
            //si no pongo el new: true me regresa el OBJETO  original sin la actualizacion
            const medicoActualizado = await Medico.findByIdAndUpdate(uid, campos, { new: true });

            break;
        case 'hospitales':
            const hospitalBD = await Hospital.findById(uid);
            if (!hospitalBD) {
                return false;
            }
            campos = {
                img: nombreArchivo
            };
            //verificamos si existe la imagen
            pathViejo = `./uploads/hospitales/${hospitalBD.img}`;

            if (fs.existsSync(pathViejo)) {
                console.log('éxiste pathviejo---->', pathViejo);
                //se borra la imagen anterior
                fs.unlinkSync(pathViejo);
            }
            //si no pongo el new: true me regresa el OBJETO  original sin la actualizacion
            const hospitalActualizado = await Hospital.findByIdAndUpdate(uid, campos, { new: true });


            break;
        default:
            resp.status(500).json({
                ok: false,
                msg: 'La tabla debe ser usuarios/medicos/hospitales'
            });
            break;
    }


};
module.exports = {
    updateImagen
};