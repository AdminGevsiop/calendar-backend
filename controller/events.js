const { response } = require('express');
const Evento = require('../models/Evento')

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user','name')

    res.json({
        ok: true,
        eventos
    })
}

const crearEventos = async ( req, res = response ) => {

    const evento = new Evento( req.body )
    try {
       
        evento.user = req.uid;
        const eventSave = await evento.save();

        res.json({
            ok: false,
            eventSave
        });

    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error"
        });
    }
}

const actualizarEventos = async (req, res = response) => {

    const eventId = req.params.id;

    try {
       
        const event = await Evento.findById( eventId )

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "evento no encontrado"
            })
        }

        if(event.user.toString() !==  req.uid){
            return res.status(401).json({
                ok: false,
                msg: "no puede editar eventos creados por otros usuarios"
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Evento.findByIdAndUpdate( eventId, newEvent, { new: true } );
        res.status(200).json({
            ok: true,
            updatedEvent
        });


    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error"
        });
    }
}

const eliminarEventos = async (req, res = response) => {

    const eventId = req.params.id;

    try {
       
        const event = await Evento.findById( eventId )

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "evento no encontrado"
            })
        }

        if(event.user.toString() !==  req.uid){
            return res.status(401).json({
                ok: false,
                msg: "no puede eliminar eventos creados por otros usuarios"
            })
        }

        await Evento.findByIdAndDelete( eventId );
        res.status(200).json({
            ok: true
        });


    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error"
        });
    }
}

module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEventos
}