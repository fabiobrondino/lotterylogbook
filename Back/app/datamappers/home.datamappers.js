const { getSpecificResult, getManyResult } = require("./utility");

const homeDatamapper = {

    async getNextGame() {
        let sqlQuery = `SELECT * FROM public.next_game WHERE "reference_date" >= CURRENT_DATE`;
        return await getManyResult(sqlQuery);
    },

    async createNextGame(nextGameData) {
        let sqlQuery = `INSERT INTO public.next_game ("reference_date", "jackpot")
                        VALUES ($1, $2)
                        RETURNING *`;
        let values = [
            nextGameData.reference_date,
            nextGameData.jackpot
        ];
        return await getSpecificResult(sqlQuery, values);
    },

    async getLuckyNumber(id_profile) {
        let sqlQuery = `SELECT lucky_number.* 
                        FROM public.lucky_number 
                        JOIN public.user 
                        ON "user".id_user = lucky_number.user_id 
                        WHERE "user".id_user = $1`;
        let values = [id_profile];
        return await getSpecificResult(sqlQuery, values);
    },

    async createLuckyNumber(newLuckyNumber) {
        let sqlQuery = `INSERT INTO public.lucky_number ("number", "star", "user_id")
                        VALUES ($1, $2, $3)
                        RETURNING *`;
        let values = [
            newLuckyNumber.luckyNumberData.number,
            newLuckyNumber.luckyNumberData.star,
            newLuckyNumber.id_profile
        ];
        return await getSpecificResult(sqlQuery, values);
    },

    async createCombinations(newCombinations) {
        let sqlQuery = `INSERT INTO public.combinations ("number", "star", "star_plus", "reference_date", "user_id")
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING *`;
        let values = [
            newCombinations.combinationsData.number,
            newCombinations.combinationsData.star,
            newCombinations.combinationsData.star_plus,
            newCombinations.combinationsData.reference_date,
            newCombinations.id_profile
        ];
        return await getSpecificResult(sqlQuery, values);
    },

    async deleteCombinations(id_combination) {
        let sqlQuery = `DELETE FROM public.combinations WHERE id_combinations = $1`;
        let values = [id_combination];
        return await getSpecificResult(sqlQuery, values);
    }
};

module.exports = homeDatamapper;
