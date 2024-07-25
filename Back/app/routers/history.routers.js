const controllerHandler = require("../controllers/helpers/controller.handler");
const errorHandler = require("../controllers/helpers/error.handler");
const ApiError = require("../errors/ApiError");
const { historyController } = require('../controllers');
const  securityService  = require('../services/security');


const express = require('express');
const router = express.Router();

//router.use(securityService.isConnected);

//! definir les prochaines routes ici

router.post('/:role_id', controllerHandler(historyController.sendResults));

router.get('/:id', controllerHandler(historyController.getHistory));

router.use(() => {
    throw new ApiError('History, not sweet History?', 404);
});
router.use(errorHandler);

module.exports = router;





// rajouter une colonne gain dans la table combinations pour chaque combinaison gagnante ?
// faire l'historique du jour en fonction de la date de référence