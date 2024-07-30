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
        
        let sqlQuery = `SELECT *
                        FROM combinations 
                        WHERE combinations.user_id = $1;
                        `;
        let values = [id_profile];

        return await getSpecificResult(sqlQuery, values);
    },

    async getSpecificHistory(id_profile, reference_date) {
        
        let sqlQuery = `SELECT *
                        FROM combinations 
                        WHERE combinations.user_id = $1
                        AND combinations.reference_date = $2;
                        `;
        let values = [id_profile, reference_date];

        return await getSpecificResult(sqlQuery, values);
    }
};

module.exports = historyDatamapper;