const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config()

const app = express()

//Base de datos
dbConnection()

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

