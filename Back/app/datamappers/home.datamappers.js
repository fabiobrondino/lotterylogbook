const { getSpecificResult, getManyResult } = require("./utility");

const homeDatamapper = {

    async getNextGame() {
        let sqlQuery = `SELECT * 
                        FROM public.next_game 
                        WHERE "reference_date" >= CURRENT_DATE 
                        ORDER BY "reference_date" ASC 
                        LIMIT 1;`;
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
        const { selectedNumbers, selectedStars } = newLuckyNumber.luckyNumberData;
        let sqlQuery = `INSERT INTO public.lucky_number ("number", "star", "user_id")
                        VALUES ($1, $2, $3)
                        RETURNING *`;
        let values = [
            selectedNumbers,
            selectedStars,
            newLuckyNumber.id_profile
        ];

        return await getSpecificResult(sqlQuery, values);
    },

    async deleteLuckyNumber(id_profile) {
        let sqlQuery = `DELETE FROM public.lucky_number WHERE id_lucky_number = $1`;
        let values = [id_profile];
        return await getSpecificResult(sqlQuery, values);
    },

    async getCombinations(id_profile) {
        let sqlQuery = `SELECT combinations.* 
                        FROM public.combinations 
                        JOIN public.user 
                        ON "user".id_user = combinations.user_id 
                        WHERE "user".id_user = $1`;
        let values = [id_profile];
        return await getSpecificResult(sqlQuery, values);
    },
    
    async createCombinations(newCombinations) {

        const games = newCombinations.combinationsData.games;
        console.log(games);
        if (!Array.isArray(games)) {
            throw new Error('Invalid data format: games should be an array');
        }
        
        //! a remettre "star_plus" dans le sqlQuery
        let sqlQuery = `INSERT INTO public.combinations ("number", "star", "reference_date", "user_id")
                        VALUES ($1, $2, $3, $4)
                        RETURNING *`;
        
        const results = []; // Tableau pour stocker les résultats des insertions
        for (const game of games) {
            // Assurez-vous que numbers et stars sont des tableaux et qu'ils contiennent des éléments
            if (!Array.isArray(game.numbers) || !Array.isArray(game.stars) || game.numbers.length === 0 || game.stars.length === 0) {
                continue; // Ignorez les entrées invalides
            }
            const reference_date = game.referenceDate;
            
            let values = [
                game.numbers,   // Insère chaque numéro individuellement
                game.stars,     // Insère chaque étoile individuellement
                reference_date,
                newCombinations.id_profile
            ];
    
            const result = await getSpecificResult(sqlQuery, values);
            console.log('toto');
            console.log(result);
            results.push(result); // Ajoute le résultat à la liste
        }
    
        return results; // Retourne tous les résultats d'insertion
    },

    async updateResultCombinations(resultData) {

        let sqlQuery = `
      UPDATE combinations
      SET gain = (
        SELECT
          CASE
            WHEN array_length(ARRAY(SELECT UNNEST(combinations.number) INTERSECT SELECT UNNEST($1::int[])), 1) = 5
             AND array_length(ARRAY(SELECT UNNEST(combinations.star) INTERSECT SELECT UNNEST($2::int[])), 1) = 2 THEN 10
            WHEN array_length(ARRAY(SELECT UNNEST(combinations.number) INTERSECT SELECT UNNEST($1::int[])), 1) = 5
             AND array_length(ARRAY(SELECT UNNEST(combinations.star) INTERSECT SELECT UNNEST($2::int[])), 1) = 1 THEN 5
            ELSE NULL
          END
      )
      WHERE reference_date = $3
      RETURNING *;`;

        let values = [
            resultData.result.number,
            resultData.result.star,
            resultData.result.reference_date
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
