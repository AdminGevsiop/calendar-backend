const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password debe de tener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    createUser
)

router.post(
    '/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password debe de tener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUser
)

router.get('/renew', validarJWT, renewToken)

module.exports = router;