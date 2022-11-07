const { response } = require("express");
const Evento = require("../models/Event");

const createEvent = async (req, res = response) => {

    const newEvent = new Evento(req.body);

    try {
        newEvent.user = req.uid;

        const result = await newEvent.save();

        return res.json({
            ok: true,
            result: result
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });

    }
}

const getEvents = async (req, res = response) => {
    const {  } = req.body;

    return res.json({
        ok: true,
        msg: "getEvents"
    });
}

const updateEvent = async (req, res = response) => {

    const {  } = req.body;

    return res.json({
        ok: true,
        msg: "updateEvent"
    });
}

const deleteEvent = async (req, res = response) => {

    const {  } = req.body;

    return res.json({
        ok: true,
        msg: "deleteEvent"
    });
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}