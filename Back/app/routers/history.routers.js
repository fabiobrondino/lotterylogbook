const controllerHandler = require("../controllers/helpers/controller.handler");
const errorHandler = require("../controllers/helpers/error.handler");
const ApiError = require("../errors/ApiError");
const { historyController } = require('../controllers');
const  securityService  = require('../services/security');


const express = require('express');
const router = express.Router();

//router.use(securityService.isConnected);

//! definir les prochaines routes ici

router.post('/', controllerHandler(historyController.sendResults));
router.get('/result', controllerHandler(historyController.getResult));
router.post('/results', controllerHandler(historyController.getResults));

router.get('/:id', controllerHandler(historyController.getHistory));

router.get('/:id/loss', controllerHandler(historyController.getLoss));
router.put('/:id/loss', controllerHandler(historyController.editLoss));

router.get('/:id/:reference_date', controllerHandler(historyController.getSpecificHistory));

router.use(() => {
    throw new ApiError('History, not sweet History?', 404);
});
router.use(errorHandler);

module.exports = router;





// rajouter une colonne gain dans la table combinations pour chaque combinaison gagnante ?
// faire l'historique du jour en fonction de la date de référence