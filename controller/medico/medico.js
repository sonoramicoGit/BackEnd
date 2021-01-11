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
const actualizarMedico = (req, resp = response, next) => {
    try {

        resp.json({
            ok: true,
            msg: 'actualizarMedico'
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
const borrarMedico = (req, resp = response, next) => {
    try {

        resp.json({
            ok: true,
            msg: 'borrarMedico'
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