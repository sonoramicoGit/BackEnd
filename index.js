//importamos la libreria express
const express = require('express');
// configuracion de las variables de entorno cn el paquete dotenv instalado
require('dotenv').config(); //leyendo las variables de entorno .env y lo estable en las variables de entorno de node
//importamos libreria BD 
const { dbConecction } = require('./baseDatos/config');
// importamosla libreria CORS
const cors = require('cors')


// TODAS LAS VARIABLES DE ENTORNO DE NODE
console.log(process.env);
//EN PARTICULAR MI PORT 
console.log(process.env.PORT + '-' + process.env.CONECT_DB);

// crear el servidor expres
const servExpres = express();

// configuramos cors al servidor express
servExpres.use(cors()); //conocido como middleware ejecuta esta instruccion cada vez que se ejecute una peticion

//conexion BD
dbConecction();

// rutas para que jale en el explorador la raiz http://localhost:3000/
servExpres.get('/', (rep, resp) => {
    // si quisiera generar un status de respuesta se pone asi
    //    resp.status(400).json({
    resp.json({
        ok: true,
        msg: 'Hola mundo'
    });
});

// iniciamos el servidor usamos variable de entorno
servExpres.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})