const { Router } = require('express');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controller/auth')


router.post('/new', createUser)

router.post('/', loginUser)

router.get('/renew', renewToken)

module.exports = router;