const { response } = require("express");
const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();


// Crear servidor de Express
const app = express();

// Conexión a la Base de Datos
dbConnection();

// Directorio Publico
app.use( express.static("public") )

// Lectura y parseo del body
app.use( express.json() )


// Rutas
app.use( "/api/auth", require("./routes/auth") )


// Escuchar eventos
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`);
})

