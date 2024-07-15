const jwt = require("jsonwebtoken");

const tokenService = {
  get(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
  },

  decode(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return null;
      }
    }
    return null;
  },
};

module.exports = tokenService;
