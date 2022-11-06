const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEventos, actualizarEventos, eliminarEventos } = require('../controller/events')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.use(validarJWT);



// obtener eventos
router.get('/', getEventos);

// crear eventos
router.post(
    '/',
    [
        check('title','el titulo es obligatorio').not().isEmpty(),
        check('start','la fecha de inicio es obligatorio').custom( isDate ),
        check('end','la fecha de finalizacion es obligatorio').custom( isDate ),
        validarCampos
    ], 
    crearEventos);

// actualizar eventos
router.put('/:id', actualizarEventos);

// eliminar eventos
router.delete('/:id', eliminarEventos);

module.exports = router;