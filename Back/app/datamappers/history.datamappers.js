const { getManyResult, getSpecificResult } = require('./utility');


const historyDatamapper = {

    async postResults(resultData) {

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

    async getSpecificResult({ referenceDate }) {
        const reference_date = new Date(referenceDate).toISOString().split('T')[0];
        let sqlQuery = `SELECT *
                        FROM results
                        WHERE results.reference_date = $1;
                        `;
        let values = [reference_date];
        const result = await getSpecificResult(sqlQuery, values);
        return result;
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
    },

    async getLoss(id_profile) {
            
            let sqlQuery = `SELECT loss
                            FROM "user" 
                            WHERE id_user = $1;
                            `;
            let values = [id_profile];
    
            return await getSpecificResult(sqlQuery, values);
    },

    async editLoss(id_profile, { loss } ) {
        console.log(loss);
        let sqlQuery = `UPDATE "user"
                        SET loss = $2
                        WHERE id_user = $1
                        RETURNING *;
                        `;
        let values = [id_profile, loss];
        console.log(values);
        return await getSpecificResult(sqlQuery, values);
    }
};

module.exports = historyDatamapper;