const controllerHandler = require("../controllers/helpers/controller.handler");
const errorHandler = require("../controllers/helpers/error.handler");
const ApiError = require("../errors/ApiError");
const { homeController } = require('../controllers');
const  securityService  = require('../services/security');


const express = require('express');
const router = express.Router();

//router.use(securityService.isConnected);

//! definir les prochaines routes ici

router.get('/', controllerHandler(homeController.nextGame));
router.post('/:role_id', controllerHandler(homeController.createNextGame));

router.get('/:id/lucky-number', controllerHandler(homeController.luckyNumber));
router.post('/:id/lucky-number', controllerHandler(homeController.createLuckyNumber));

router.post('/:id/combinations', controllerHandler(homeController.createCombinations));
router.delete('/combinations/:id_combination', controllerHandler(homeController.deleteCombinations));

router.use(() => {
    throw new ApiError('Home, not sweet Home?', 404);
});
router.use(errorHandler);

module.exports = router;