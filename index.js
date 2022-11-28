const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//cors
app.use(cors());

// Directorio Público
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() );

//rutas
// TODO: auth // crear, login renew
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html')
})

// TODO: CRUD: eventos

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})