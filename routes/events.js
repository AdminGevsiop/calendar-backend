/*
    Events routes | Events
    host + /api/events
*/
const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");


const router = Router();
router.use(validateJWT)

router.get("/", [], getEvents);

router.post("/create", [], createEvent);

router.put("/:id", [], updateEvent);

router.delete("/:id", [], deleteEvent);


module.exports = router;