//importamos la libreria express
const express = require('express');
// configuracion de las variables de entorno cn el paquete dotenv instalado
require('dotenv').config(); //leyendo las variables de entorno .env y lo estable en las variables de entorno de node
//importamos libreria BD 
const { dbConecction } = require('./baseDatos/conexionDB');
// importamosla libreria CORS
const cors = require('cors');



// TODAS LAS VARIABLES DE ENTORNO DE NODE
// console.log(process.env);
//EN PARTICULAR MI PORT 
console.log(process.env.PORT + '-' + process.env.CONECT_DB);

// crear el servidor expres
const servExpres = express();

// configuramos cors al servidor express
servExpres.use(cors()); //conocido como middleware ejecuta esta instruccion cada vez que se ejecute una peticion

// lectura y parseo del body ojo antes de las rutas
servExpres.use(express.json());

//conexion BD
dbConecction();
//Directorio Publico donde guardo el html de la autenticacion por google
servExpres.use(express.static('public'));

//RUTAS
//DE USUARIOS    
// use(url, controlador) el controlador lo definimos en el archivo especifico de rutas del usuario
servExpres.use('/api/usuarios', require('./route/usuario/usuario'));
// DE LOGIN
servExpres.use('/api/login', require('./route/usuario/auth'));
// DE HOSPITALES
servExpres.use('/api/hospital', require('./route/hospital/hospital'));
// DE MEDICOS
servExpres.use('/api/medico', require('./route/medico/medico'));

//DE BUSQUETA TOTAL
servExpres.use('/api/busqueda', require('./route/utils/busqueda'));

//DE upload
servExpres.use('/api/upload', require('./route/utils/upload'));


// iniciamos el servidor usamos variable de entorno
servExpres.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});