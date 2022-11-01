const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email });
    if(!usuario){
        return res.status(400).json({
            ok: false,
            msg: "En usuario no existe"
        });
    }

    const validatePassword = bcrypt.compareSync(password, usuario.password);
    if(!validatePassword){
        return res.status(400).json({
            ok: false,
            msg: "Contraseña incorrecta"
        });
    }

    return res.status(200).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name
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

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

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