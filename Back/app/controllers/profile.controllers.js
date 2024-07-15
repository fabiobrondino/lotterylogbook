const { profileDatamapper } = require("../datamappers");

const controller = {

  async getProfile(req, res) {
    const id_profile = req.params.id;

      const profile = await profileDatamapper.getProfile(id_profile);
      res.json(profile);
  },

  async editProfileUser(req, res) {
    const edit_profile = req.body;
    const id_profile = req.params.id;
    const edit_info = {edit_profile, id_profile};

      const profile = await profileDatamapper.editProfileUser(edit_info);
      res.json(profile);
  },

  async deleteProfileUser(req, res) {
    const id_delete = req.params.id;

      const profile = await profileDatamapper.deleteProfileUser(id_delete);
      res.json(profile);
  },
};

module.exports = controller;
