const { response } = require("express");
const Hospital = require('../../model/hospital/hospital');
const Usuario = require("../../model/usuario/usuario");

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
const actualizarHospital = async(req, resp = response) => {
    try {
        const { nombre } = req.body;
        const idHospital = req.params.id; //el id del hospital a modificar
        const idUser = req.uid; //el id del usuario logeado
        //   const { email, password, google, ...campos } = req.body; //quitamos los 3 campos del objeto campos
        let campos;
        campos = {
            usuario: idUser,
            nombre: nombre

        };
        console.log('miuid==', idHospital);
        const hospitalBD = await Hospital.findById(idHospital);
        if (!hospitalBD) {
            return resp.status(400).json({
                ok: false,
                msg: `El hospital con el id=${idHospital} no existe`
            });
        }

        //si no pongo el new: true me regresa el OBJETO  original sin la actualizacion
        const hospitalActualizado = await Hospital.findByIdAndUpdate(idHospital, campos, { new: true });
        console.log('hospitalActualizado', hospitalActualizado);


        resp.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });
    }


};
const borrarHospital = async(req, resp = response) => {
    try {
        const idHospital = req.params.id; //el id del hospital a borrar
        console.log('miuid==', idHospital);
        const hospitalBD = await Hospital.findById(idHospital);
        if (!hospitalBD) {
            return resp.status(400).json({
                ok: false,
                msg: `El hospital con el id=${idHospital} no existe`
            });
        }
        //borrar hospital en BD 
        //recordar que lo importante de un usuario seria cambiar un campo activo= a false mas que borrarlo 
        await Hospital.findByIdAndDelete(idHospital);

        resp.json({
            ok: true,
            msg: 'Hospital Eliminado!!'
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