const { getSpecificResult } = require("./utility");
const bcrypt = require('bcrypt');

const authDatamapper = {
  
  async addUser(user) {
console.log(user);
    let sqlQuery = `INSERT INTO 
                    public.user ("first_name", "last_name", "email", "password") 
                    VALUES ($1, $2, $3, $4) 
                    RETURNING * `;

    const encryptedPassword = bcrypt.hashSync(user.password, 10);

    let values = [
      user.firstname,
      user.lastname,
      user.email,
      encryptedPassword,
    ];

    const newUser = await getSpecificResult(sqlQuery, values);
    console.log(newUser);

    return await newUser;
  },

  async connectUser(user) {
    console.log(user);
    let sqlQuery = `SELECT * FROM public.user 
                    WHERE email = $1`;

    let values = [user.email];

    const userFound = await getSpecificResult(sqlQuery, values);
console.log(userFound);
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
