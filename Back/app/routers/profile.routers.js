const controllerHandler = require("../controllers/helpers/controller.handler");
const errorHandler = require("../controllers/helpers/error.handler");
const ApiError = require("../errors/ApiError");
const { profileController } = require("../controllers");
const  securityService  = require('../services/security');


const express = require("express");
const router = express.Router();

router.use(securityService.isConnected);

/**
 * GET /Profile/{id}
 * @summary  La route permet de récupérer le profil d'un utilisateur
 * @param {number} id.path - The user id
 * @return {Profile} 200 - success response - application/json
 */
router.get("/:id", controllerHandler(profileController.getProfile));

/**
 * PUT /Profile/{id}/edit
 * @summary  La route permet de récupérer le profil d'un utilisateur et de le modifier
 * @param {number} id.path - The user id
 * @return {Profile} 200 - success response - application/json
 */
router.put("/:id/edit", controllerHandler(profileController.editProfileUser));

/**
 * DELETE /Profile/{id}/delete
 * @summary  La route permet de récupérer le profil d'un utilisateur et de le supprimer
 * @param {number} id.path - The user id
 * @return {Profile} 200 - success response - application/json
 */
router.delete("/:id/delete", controllerHandler(profileController.deleteProfileUser));

router.use(() => {
    throw new ApiError('Mauvais Profile!', 404);
  });
  
  router.use(errorHandler);

module.exports = router;