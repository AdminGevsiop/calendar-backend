const { Schema, model } = require("mongoose");

const schema = Schema({
    title: {
        type: String,
        require: true
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = model("Evento", schema);