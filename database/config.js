const mongoose = require("mongoose");

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("DB online");
    } catch (err) {
        console.log(err);
        throw new Error("Error a la hora de inicializar la DB");
    }

}

module.exports = {
    dbConnection
}


