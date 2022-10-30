const { response } = require("express");


const login = (req, res = response) => {

    res.json({
        ok: true,
        msg: "Login"
    });
}

const create = (req, res = response) => {

    res.json({
        ok: true,
        msg: "Crear Usuario"
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