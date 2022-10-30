const { response } = require('express');
const User = require('../models/User');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if ( user ) {
            res.status(400).json({
                ok: false,
                msg: 'El correo ya esta siendo usado por otro usuario'
            })
        }

        user = new User(req.body);
        await user.save();

        res.status(201).json({
            ok: true,
            _id: user.id,
            user_name: user.name
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    res.status(201).json({
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