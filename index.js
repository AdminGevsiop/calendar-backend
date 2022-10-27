const express = require('express');
require('dotenv').config();

//crear el servidor de express
const app = express();

// Directorio Público
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() );

//rutas
// TODO: auth // crear, login renew
app.use('/api/auth', require('./routes/auth'))
// TODO: CRUD: eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})