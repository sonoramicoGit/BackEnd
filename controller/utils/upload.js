const response = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImagen } = require('./update-imagen');
const path = require('path'); //propio de node irve para construir un path completo

const fs = require('fs'); //paquete propio de node filesystem




const uploadFile = async(req, resp = response) => {

    try {
        const tipoCollection = req.params.tipo;
        const id = req.params.id;
        //validar tipo
        const tiposValidos = ['medicos', 'usuarios', 'hospitales'];
        if (!tiposValidos.includes(tipoCollection)) {
            return resp.status(400).json({
                ok: false,
                msg: 'No es un medico,usuario u hospital!'
            });
        }

        //validar que exista  archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return resp.status(400).json({
                ok: false,
                msg: 'No es fue envido ningun archivo!'
            });
        }
        //Procesar imagen
        const file = req.files.imagen;
        //obtener la extension
        const nameArray = file.name.split('.');
        const extFile = nameArray[nameArray.length - 1]
            //validar extension
        const extValidas = ['png', 'jpg', 'jpeg', 'git'];
        if (!extValidas.includes(extFile)) {
            return resp.status(400).json({
                ok: false,
                msg: 'No es un archivo valido!!'
            });
        }
        console.log(extFile);

        //generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extFile}`; //usando la libreria uuid
        //path para guardar la imagen
        const pathUpload = `./uploads/${tipoCollection}/${nombreArchivo}`;

        // Use the mv() method to place the file somewhere on your server
        file.mv(pathUpload, function(err) {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    msg: err
                });
            }

            //actualizar base de datos
            updateImagen(tipoCollection, id, nombreArchivo); //referencia al metodo de la clase ./update-imagen.js

            //envio exito del proceso
            resp.json({
                ok: true,
                msg: 'El archivo subido ::',
                nombreArchivo
            });

        });



    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado..revisar logs'
        });

    }

};

const retornaImagen = (req, resp = response) => {
    const tipoCollection = req.params.tipo;
    const foto = req.params.foto;
    //__dirname me da el contexto de mi aplicacion desplegada ,concatenamos la ruta de mi imagen
    let pathImg = path.join(__dirname, `../../uploads/${tipoCollection}/${foto}`);
    //validamos que exista la iamgern de no ser asi cargamosd una por default
    if (fs.existsSync(pathImg)) { //validamdos que exista la imagen
        //para regresar una imagen y no un json se hace asi
        resp.sendFile(pathImg);
    } else {
        pathImg = path.join(__dirname, `../../uploads/no-img.jpg`); //se envia imagen por default
        resp.sendFile(pathImg);
    }
};

module.exports = {
    uploadFile,
    retornaImagen
}