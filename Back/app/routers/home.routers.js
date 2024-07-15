const controllerHandler = require("../controllers/helpers/controller.handler");
const errorHandler = require("../controllers/helpers/error.handler");
const ApiError = require("../errors/ApiError");
const { homeController } = require('../controllers');
const  securityService  = require('../services/security');


const express = require('express');
const router = express.Router();

router.use(securityService.isConnected);

//! definir les prochaines routes ici

router.use(() => {
    throw new ApiError('Home, not sweet Home?', 404);
});
router.use(errorHandler);

module.exports = router;