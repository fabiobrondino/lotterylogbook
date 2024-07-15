const pool = require("../services/dbPool");

const utilDB = {

  async getSpecificResult(sqlQuery, values) {
    let result;
    let error;

    try {
      const response = await pool.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
    }

    return { error, result };
  },

  async getManyResult(sqlQuery) {
    let result;
    let error;

    try {
      const response = await pool.query(sqlQuery);
      result = response.rows;
    } catch (err) {
      error = err;
    }

    return { error, result };
  },
};

module.exports = utilDB;
