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
    
    const eventos = await Evento.find().populate('user', ['name']);

    return res.json({
        ok: true,
        eventos: eventos
    });
}

const updateEvent = async (req, res = response) => {

    const eventId = req.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findOne({id: eventId});

        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado"
            });
        }

        if(evento.user != uid){
            return res.status(401).json({
                ok: false,
                msg: "Usted no tiene permisos para editar el evento"
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, {new: true});  

        return res.json({
            ok: true,
            msg: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.params.uid;

    try {
        const evento = await Evento.find({id: eventId});

        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado"
            });
        }

        if(evento.user != uid){
            return res.status(401).json({
                ok: false,
                msg: "Usted no tiene permisos para eliminar el evento"
            });
        }

        await Evento.findByIdAndDelete(eventId);

        return res.json({
            ok: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }

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