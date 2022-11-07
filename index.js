const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

const app = express()

//Base de datos
dbConnection()

// CORS
app.use(cors())

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'))
//TODO: CRUD: Eventos

//Directorio Publico - Middleware


//Listeting to petitions
app.listen(process.env.PORT, () => {
  console.log('Servidor corriento en puerto', process.env.PORT)
})

