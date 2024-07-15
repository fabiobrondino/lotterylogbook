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
                    SET "firstname" = $1, "lastname" = $2, "password" = $3, "avatar" = $4 
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
//! Remplacer la requête SQL par une requête qui supprime l'utilisateur et toutes ses données associées
    let sqlQuery = `DELETE FROM public.user u
                    USING public.session_exercice se, public.exercice e, public.session s
                    WHERE u.id_user = $1
                    AND u.id_user = e.creator_userid
                    AND e.id_exercice = se.exerciceid
                    AND se.sessionid = s.id_session
                    AND u.id_user = s.userid`;
                    
    let values = [id_delete];

    return await getSpecificResult(sqlQuery, values);
  },
};
module.exports = profileDatamapper;
