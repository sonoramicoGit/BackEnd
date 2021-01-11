//importamos paquetes
const { Schema, model } = require('mongoose');
// creamos el esquema
const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId, //existe una relacion con el id del Usuario
        ref: 'Usuario'

    }

}, { collection: 'hospitales' }); //para que aparesca en la BD de mongocompass como hospitales


HospitalSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject(); //se extraen los campos del objeto que no se presentaran en la salida
    return object;
});

module.exports = model('Hospital', HospitalSchema);