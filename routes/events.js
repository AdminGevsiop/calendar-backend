/*
    Events routes | Events
    host + /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");


const router = Router();
router.use(validateJWT)

router.post("/create", [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validateFields
], createEvent);

router.get("/", [], getEvents);

router.put("/:id", [], updateEvent);

router.delete("/:id", [], deleteEvent);


module.exports = router;