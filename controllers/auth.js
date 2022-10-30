const { response } = require("express");

const login = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: "Login",
        email,
        password
    });
}

const create = (req, res = response) => {

    const { name, email, password } = req.body;

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