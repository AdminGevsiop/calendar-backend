const { response } = require("express");


const login = (req, res = response) => {

    const { name, email, password } = req.body;

    res.json({
        ok: true,
        msg: "Login",
        email,
        password
    });
}

const create = (req, res = response) => {

    const { name, email, password } = req.body;

    if(name.length < 5){
        return res.status(400).json({
            ok: false,
            msg: "El nombre debe tener almenos 5 letras"
        });
    }

    res.json({
        ok: true,
        msg: "Crear Usuario",
        name,
        email,
        password
    });
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