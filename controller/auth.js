const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt')


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({
                ok: false,
                msg: 'El correo ya esta siendo usado por otro usuario'
            })
        }

        user = new User(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // generar token
        const token = await generarJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            _id: user.id,
            user_name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña incorrecta'
            })
        }

        // generar token
        const token = await generarJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            _id: user.id,
            user_name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error'
        })
    }
}

const renewToken = async (req, res = response) => {

    const { uid, name } = req.uid;

    // generar token
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}