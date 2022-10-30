/*
    Authentication routes | Auth
    host + /api/auth
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { create, login, renew } = require("../controllers/auth");


router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 })
], login);

router.post("/create", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 })
], create);

router.get("/renew", renew);


module.exports = router;