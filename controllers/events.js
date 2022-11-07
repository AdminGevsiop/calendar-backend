const { response } = require("express");

const createEvent = async (req, res = response) => {

    const {  } = req.body;

    return res.json({
        ok: true,
        msg: "createEvent"
    });
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