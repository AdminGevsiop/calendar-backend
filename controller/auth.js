const { response } = require('express');


const createUser = (req, res = response) => {

    const { name, email, password} = req.body;

    if( name.length < 3) {
        return res.status(400).json({
            ok: false,
            msg: 'error - el nombre debe tener como minimo 3 letras'
        });
    }

    res.json({
        ok: true,
        msg: 'create',
        name,
        email,
        password
    })
}

const loginUser = (req, res = response) => {

    const { email, password} = req.body;

    res.json({
        ok: true,
        msg: 'loginUser',
        email,
        password
    })
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renewToken'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}