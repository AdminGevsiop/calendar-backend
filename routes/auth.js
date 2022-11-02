/*
    Authentication routes | Auth
    host + /api/auth
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { create, login, renew } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");


router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    validateFields
], login);

router.post("/create", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    validateFields
], create);

router.get("/renew", validateJWT, renew);


module.exports = router;