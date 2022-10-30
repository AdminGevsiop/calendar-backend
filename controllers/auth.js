const { response } = require("express");
const { validationResult } = require("express-validator");

const login = (req, res = response) => {

    const { email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }

    res.json({
        ok: true,
        msg: "Login",
        email,
        password
    });
}

const create = (req, res = response) => {

    const { name, email, password } = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
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