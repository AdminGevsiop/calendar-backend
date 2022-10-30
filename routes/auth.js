/*
    Authentication routes | Auth
    host + /api/auth
*/
const { Router } = require("express");
const router = Router();
const { create, login, renew } = require("../controllers/auth");


router.post("/", login);
router.post("/create", create);
router.get("/renew", renew);


module.exports = router;