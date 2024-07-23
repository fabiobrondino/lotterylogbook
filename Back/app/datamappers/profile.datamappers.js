const { getSpecificResult } = require("./utility");
const bcrypt = require('bcrypt');

const profileDatamapper = {
  async getProfile(id_profile) {

    let sqlQuery = `SELECT * FROM public.user WHERE id_user = $1`;

    let values = [id_profile];

    return await getSpecificResult(sqlQuery, values);
  },

  async editProfileUser(edit_info) {

    let sqlQuery = `UPDATE public.user 
                    SET "first_name" = $1, "last_name" = $2, "password" = $3, "avatar" = $4 
                    WHERE "id_user" = $5 
                    RETURNING *`;

    const encryptedPassword = bcrypt.hashSync(edit_info.edit_profile.password, 10);

    let values = [
      edit_info.edit_profile.firstname,
      edit_info.edit_profile.lastname,
      encryptedPassword,
      edit_info.edit_profile.avatar,
      edit_info.id_profile,
    ];

    return await getSpecificResult(sqlQuery, values);
  },

  async deleteProfileUser(id_delete){
//! Fonctionnel mais basique. La requete devra être revue en fonction des tables à supprimer en cascade en vue des prochaines fonctionalités
    let sqlQuery = `DELETE FROM public.user WHERE id_user = $1`;
                    
    let values = [id_delete];

    return await getSpecificResult(sqlQuery, values);
  },
};
module.exports = profileDatamapper;
