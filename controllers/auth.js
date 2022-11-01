const { response } = require("express");
const Usuario = require("../models/Usuario");

const login = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: "Login",
        email,
        password
    });
}

const create = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "En usuario existe con ese correo"
            });
        }
        
        usuario = new Usuario(req.body);
        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }
}

const renew = (req, res = response) => {

    res.json({
        ok: true,
        msg: "Renovar sesión"
    });
}

module.exports = {
    login,
    create,
    renew
}