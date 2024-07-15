const controllerHandler = require("../controllers/helpers/controller.handler");
const errorHandler = require("../controllers/helpers/error.handler");
const ApiError = require("../errors/ApiError");
const { authController } = require("../controllers");

const express = require("express");
const router = express.Router();

/**
 * POST /Auth/register
 * @summary  La route permet d'accéder à la page d'inscription
 * @return {Auth} 200 - success response - application/json
 */
router.post("/register", controllerHandler(authController.addUser));

/**
 * POST /Auth/login
 * @summary  La route permet d'accéder à la page de connexion
 * @return {Auth} 200 - success response - application/json
 */
router.post("/login", controllerHandler(authController.connectUser));

router.use(() => {
    throw new ApiError('Authentification erreur!', 404);
  });
  
  router.use(errorHandler);

module.exports = router;
