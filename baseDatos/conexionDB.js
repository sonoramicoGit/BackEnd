// import del paquete
const mongoose = require('mongoose');
// esta funcion me devuelve una promesa
const conecctionBD = async() => {
    try {
        //await espere a que todo esto pase ya que es una promesa
        await mongoose.connect(process.env.CONECT_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Conexion bd successfull!!');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la bd de Mongo');
    }


}

module.exports = {
    dbConecction: conecctionBD
}