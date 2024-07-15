const { authDatamapper } = require("../datamappers");
const tokenService = require("../services/token");

const controller = {

  async addUser(req, res) {

      const newUser = req.body;

        const result = await authDatamapper.addUser(newUser);
        res.json(result);

  },

  async connectUser(req, res) {

      const userInfo = req.body;

      const {result} = await authDatamapper.connectUser(userInfo);

      const userPayload = {
        userId: result[0].id_user,
        username: `${result[0].firstname} ${result[0].lastname}`,
      };

      const token = tokenService.get(userPayload);
      res.json({ token });

  },
};

module.exports = controller;
