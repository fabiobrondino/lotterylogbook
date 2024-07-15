const { getSpecificResult } = require("./utility");
const bcrypt = require('bcrypt');

const authDatamapper = {
  
  async addUser(user) {

    let sqlQuery = `INSERT INTO 
                    public.user ("firstname", "lastname", "email", "password") 
                    VALUES ($1, $2, $3, $4) 
                    RETURNING * `;

    const encryptedPassword = bcrypt.hashSync(user.password, 10);

    let values = [
      user.firstname,
      user.lastname,
      user.email,
      encryptedPassword,
    ];

    return await getSpecificResult(sqlQuery, values);
  },

  async connectUser(user) {

    let sqlQuery = `SELECT * FROM public.user 
                    WHERE email = $1`;

    let values = [user.email];

    const userFound = await getSpecificResult(sqlQuery, values);

    const validPassword = bcrypt.compareSync(user.password, userFound.result[0].password);
    if (!validPassword) {
      return { error: "Mot de passe incorrect" };
    } 
    else {
      return userFound;
    }
  },

};

module.exports = authDatamapper;
