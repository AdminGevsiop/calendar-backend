const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();


// Crear servidor de Express
const app = express();

// Conexión a la Base de Datos
dbConnection();

app.use(cors());

// Directorio Publico
app.use( express.static("public") )

// Lectura y parseo del body
app.use( express.json() )


// Rutas
app.use( "/api/auth", require("./routes/auth") )
app.use( "/api/events", require("./routes/events") )


// Escuchar eventos
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`);
})

