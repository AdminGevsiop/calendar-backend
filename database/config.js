const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('conectado')
    } catch (error) {
        console.log(error);
        throw new Error('Error en la coneccion con la BD');
    }
}

module.exports = {
    dbConnection
}