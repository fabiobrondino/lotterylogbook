const express = require("express");
const router = express.Router();

const authRouter = require('./auth.routers');
const homeRouter = require('./home.routers');
const profileRouter = require('./profile.routers');

router.use('/', authRouter);
router.use('/home', homeRouter);
router.use('/profile', profileRouter);

module.exports = router;