//importamos paquetes
const { Schema, model } = require('mongoose');
// creamos el esquema
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

// si quisiera cambiar el nombre de el campo _v o _id se hace asi 
// no se presenta el campo -v y se modifico el campo -id por _uid
UsuarioSchema.method('toJSON', function() {
    const { _v, _id, password, ...object } = this.toObject(); //se extraen los campos del objeto no se presentaran en la salida
    object.uid = _id; //cambio el valor dque se presentara de _id a uid
    return object;
});
module.exports = model('Usuario', UsuarioSchema);