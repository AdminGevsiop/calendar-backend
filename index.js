// host + /api/auth

const express = require('express');
require( 'dotenv' ).config();

console.log( process.env )

// servidor de express
const app = express();

// Directorio publico
app.use( express.static('public') );

//lectura del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'))





// escuchar
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});