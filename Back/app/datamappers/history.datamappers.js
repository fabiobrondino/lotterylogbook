const { getManyResult, getSpecificResult } = require('./utility');


const historyDatamapper = {

    async postResults(resultData) {
        console.log(resultData);

        let sqlQuery = `INSERT INTO results ("number", "star", "reference_date")
                        VALUES ($1, $2, $3)
                        RETURNING *`;
        let values = [
            resultData.result.number,
            resultData.result.star,
            resultData.result.reference_date
        ];
        return await getSpecificResult(sqlQuery, values);
    },

    async getLastResult() {
            let sqlQuery = `SELECT *
                            FROM results
                            ORDER BY reference_date DESC
                            LIMIT 1;
                            `;
    
            return await getManyResult(sqlQuery);
    },

    async getSpecificResult(reference_date) {

        let sqlQuery = `SELECT *
                        FROM results
                        WHERE results.reference_date = $1;
                        `;
        let values = [reference_date];

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