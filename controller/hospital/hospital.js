const { response } = require("express");
const Hospital = require('../../model/hospital/hospital');

const getHospitales = async(req, resp = response) => {
    try {
        const hospitalList = await Hospital.find().populate('usuario', 'nombre email');
        resp.json({
            ok: true,
            hospitales: hospitalList
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }

};
const crearHospital = async(req, resp = response) => {
    try {

        const uid = req.uid;
        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        });
        console.log(hospital);
        const hospitalDB = await hospital.save();

        resp.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }


};
const actualizarHospital = (req, resp = response) => {
    try {

        resp.json({
            ok: true,
            msg: 'actualizarHospital'
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }


};
const borrarHospital = (req, resp = response) => {
    try {

        resp.json({
            ok: true,
            msg: 'borrarHospital'
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }


};
module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};