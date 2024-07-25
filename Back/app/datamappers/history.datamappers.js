const { getManyResult, getSpecificResult } = require('./utility');


const historyDatamapper = {

    async getResults(resultData) {

        let sqlQuery = `INSERT INTO results ("number", "star", "reference_date")
                        VALUES ($1, $2, $3)
                        RETURNING *`;
        let values = [
            resultData.number,
            resultData.star,
            resultData.reference_date
        ];
        return await getSpecificResult(sqlQuery, values);
    },

    async getHistory(id_profile) {
        console.log(id_profile);
        let sqlQuery = `SELECT 
                            combinations.date AS combinations_date, 
                            combinations.number AS combinations_number,
                            combinations.star AS combinations_star,
                            combinations.star_plus AS combinations_star_plus,
                            combinations.reference_date AS combinations_reference_date,
                            lucky_number.number AS lucky_number_number,
                            lucky_number.star AS lucky_number_star
                        FROM combinations 
                        JOIN "user" ON "user".id_user = combinations.user_id 
                        JOIN lucky_number ON lucky_number.user_id = "user".id_user 
                        WHERE "user".id_user = $1;
`;
        let values = [id_profile];
        console.log(values);
        return await getSpecificResult(sqlQuery, values);
    }
};

module.exports = historyDatamapper;