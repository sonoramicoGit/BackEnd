const { response } = require("express");
const Medico = require('../../model/medico/medico');
const getMedico = async(req, resp = response, next) => {
    try {
        const medicoList = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');

        resp.json({
            ok: true,
            medicoList: medicoList
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }
    next();

};
const crearMedico = async(req, resp = response) => {
    try {
        const uid = req.uid;
        const { nombre, id_hospital } = req.body;
        console.log('uid=' + uid + ' id_hospital=' + id_hospital);
        const medico = new Medico({
            nombre: nombre,
            usuario: uid,
            hospital: id_hospital

        });
        const medicoBD = await medico.save();
        resp.json({
            ok: true,
            medico: medicoBD
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }

};
const actualizarMedico = async(req, resp = response) => {
    try {

        const { nombre, id_hospital } = req.body;
        const idMedico = req.params.id; //el id del medico a modificar
        const idUser = req.uid; //el id del usuario logeado
        console.log({ idMedico, idUser });
        let campos;
        campos = {
            nombre: nombre,
            usuario: idUser,
            hospital: id_hospital

        };
        //consultamos medico 
        const medicoBD = await Medico.findById(idMedico);
        if (!medicoBD) {
            return resp.status(400).json({
                ok: false,
                msg: `El medico con el id=${idMedico} no existe`
            });
        }
        //si no pongo el new: true me regresa el OBJETO  original sin la actualizacion
        const medicoActualizado = await Medico.findByIdAndUpdate(idMedico, campos, { new: true });
        console.log('medicoActualizado', medicoActualizado);


        resp.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }


};
const borrarMedico = async(req, resp = response, next) => {
    try {

        const idMedico = req.params.id; //el id del medico a borrar
        console.log('miuid==', idMedico);
        const medicoBD = await Medico.findById(idMedico);
        if (!medicoBD) {
            return resp.status(400).json({
                ok: false,
                msg: `El medico con el id=${idMedico} no existe`
            });
        }
        //borrar medico en BD 
        //recordar que lo importante de un usuario seria cambiar un campo activo= a false mas que borrarlo 
        await Medico.findByIdAndDelete(idMedico);

        resp.json({
            ok: true,
            msg: 'Medico Eliminado!!'
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }
    next();

};
module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}