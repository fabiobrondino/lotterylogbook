const { getSpecificResult } = require("./utility");
const bcrypt = require('bcrypt');

const authDatamapper = {
  async addUser(user) {
    // Vérification de l'existence de l'email
    let checkEmailQuery = `SELECT * FROM public.user WHERE email = $1`;
    let emailValues = [user.email];
    const userExists = await getSpecificResult(checkEmailQuery, emailValues);
    if (userExists.result.length > 0) {
      return { error: "Un utilisateur avec cet email existe déjà" };
    }

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

    return await newUser;
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

  async saveResetToken(token, expiry, email) {
    console.log(token);
    let sqlQuery = `UPDATE public.user 
                    SET reset_token = $1, reset_token_expiry = $2 
                    WHERE email = $3 
                    RETURNING *`;
    let values = [token, expiry, email];
    const resetToken = await getSpecificResult(sqlQuery, values);
    return await resetToken;
  },

  async verifyResetToken(token) {
    let sqlQuery = `SELECT * FROM public.user 
                    WHERE reset_token = $1`;
    let values = [token];

    const user = await getSpecificResult(sqlQuery, values);
    return user.result.length ? user.result[0] : null;
  },

  async resetPassword(email, newPassword) {
    let checkEmailQuery = `SELECT * FROM public.user WHERE email = $1`;
    let emailValues = [email];
    const userFound = await getSpecificResult(checkEmailQuery, emailValues);

    if (userFound.result.length === 0) {
      return { error: "Utilisateur non trouvé" };
    }

    const encryptedPassword = bcrypt.hashSync(newPassword, 10);
    let updatePasswordQuery = `UPDATE public.user 
                               SET password = $1 
                               WHERE email = $2 
                               RETURNING *`;
    let updateValues = [encryptedPassword, email];

    const updatedUser = await getSpecificResult(updatePasswordQuery, updateValues);

    return updatedUser;
  }

};

module.exports = authDatamapper;
