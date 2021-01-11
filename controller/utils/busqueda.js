const { response } = require("express");
const Medico = require("../../model/medico/medico");
const Usuario = require("../../model/usuario/usuario");
const Hospital = require("../../model/hospital/hospital");

const getBusquedaTotal = async(req, resp = response) => {

    try {
        const criterio = req.params.criterio;
        console.log(criterio);
        //usamos expresion regular para una busqueda no exacta es decir que sontemple alguna cadena ese valor pasado
        const usuarioExpreReg = new RegExp(criterio, 'i'); // insensible a la info es decir como un like
        /*  const listaUsuarios = await Usuario.find({ nombre: usuarioExpreReg });
         const listaMedicos = await Medico.find({ nombre: usuarioExpreReg });
         const listaHospital = await Hospital.find({ nombre: usuarioExpreReg }); */

        //Unimos los 3 llamados en uno solo
        const [listaUsuarios, listaMedicos, listaHospital] = await Promise.all([
            Usuario.find({ nombre: usuarioExpreReg }),
            Medico.find({ nombre: usuarioExpreReg }),
            Hospital.find({ nombre: usuarioExpreReg })

        ]);

        resp.json({
            ok: true,
            listaUsuarios,
            listaHospital,
            listaMedicos
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });

    }

};
const getBusquedaCollection = async(req, resp = response) => {

    try {
        const criterio = req.params.criterio;
        const nombreTabla = req.params.tabla;
        console.log([criterio, nombreTabla]);
        const usuarioExpreReg = new RegExp(criterio, 'i'); // insensible a la info es decir como un like
        let data = [];
        switch (nombreTabla) {
            case 'usuarios':
                data = await Usuario.find({ nombre: usuarioExpreReg })
                    .populate('usuario', 'nombre email');
                break;
            case 'medicos':
                data = await Medico.find({ nombre: usuarioExpreReg })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: usuarioExpreReg })
                    .populate('usuario', 'nombre email');

                break;
            default:
                resp.status(500).json({
                    ok: false,
                    msg: 'La tabla debe ser usuarios/medicos/hospitales'
                });
                break;
        }

        resp.json({
            ok: true,
            informacion: data
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });

    }

};
module.exports = {
    getBusquedaTotal,
    getBusquedaCollection
};