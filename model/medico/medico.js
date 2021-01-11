//importamos paquetes
const { Schema, model } = require('mongoose');
// creamos el esquema
const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId, //existe una relacion con el id del Usuario
        ref: 'Usuario',
        required: true

    },
    hospital: {
        type: Schema.Types.ObjectId, //existe una relacion uno a uno por el momento con el id del Hospital
        ref: 'Hospital',
        required: true

    }

}); //para que aparesca en la BD de mongocompass como hospitales


MedicoSchema.method('toJSON', function() {
    const { _v, ...object } = this.toObject(); //se extraen los campos del objeto que no se presentaran en la salida
    return object;
});
module.exports = model('Medico', MedicoSchema);