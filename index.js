const express = require("express");
require("dotenv").config();


// Crear servidor de Express
const app = express();

// Directorio Publico
app.use( express.static("public") )


// Rutas
// app.get("/", (req, res) => {

//     res.json({
//         ok: true
//     });
// })


// Escuchar eventos
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${4000}`);
})

