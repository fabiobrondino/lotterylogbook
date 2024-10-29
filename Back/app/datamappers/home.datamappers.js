const { getSpecificResult, getManyResult } = require("./utility");

const homeDatamapper = {

    async getNextGame() {
        let sqlQuery = `SELECT * 
                        FROM public.next_game 
                        WHERE "reference_date" > CURRENT_DATE 
                        ORDER BY "reference_date" ASC 
                        LIMIT 1;`;
        return await getManyResult(sqlQuery);
    },

    async createNextGame(nextGameData) {
        console.log(nextGameData);
        let sqlQuery = `INSERT INTO public.next_game ("reference_date", "jackpot")
                        VALUES ($1, $2)
                        RETURNING *`;
        let values = [
            nextGameData.reference_date,
            nextGameData.jackpot
        ];
        console.log(values);
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
        console.log(newLuckyNumber);
        const { selectedNumbers, selectedStars } = newLuckyNumber.luckyNumberData;
        let sqlQuery = `INSERT INTO public.lucky_number ("number", "star", "user_id")
                        VALUES ($1, $2, $3)
                        RETURNING *`;
        let values = [
            selectedNumbers,
            selectedStars,
            newLuckyNumber.id_profile
        ];
        console.log(values);
        console.log('toto');
        return await getSpecificResult(sqlQuery, values);
    },

    async deleteLuckyNumber(id_profile) {
        let sqlQuery = `DELETE FROM public.lucky_number WHERE id_lucky_number = $1`;
        let values = [id_profile];
        return await getSpecificResult(sqlQuery, values);
    },
    
    async createCombinations(newCombinations) {
        console.log(newCombinations);
        console.log(newCombinations.combinationsData);
        console.log(newCombinations.combinationsData.games);
        const games = newCombinations.combinationsData.games;
        if (!Array.isArray(games)) {
            throw new Error('Invalid data format: games should be an array');
        }
        
        //! a remettre "star_plus" et "reference_date" dans le sqlQuery
        let sqlQuery = `INSERT INTO public.combinations ("number", "star", "user_id")
                        VALUES ($1, $2, $3)
                        RETURNING *`;
        
        const results = []; // Tableau pour stocker les résultats des insertions
        for (const game of games) {
            // Assurez-vous que numbers et stars sont des tableaux et qu'ils contiennent des éléments
            if (!Array.isArray(game.numbers) || !Array.isArray(game.stars) || game.numbers.length === 0 || game.stars.length === 0) {
                continue; // Ignorez les entrées invalides
            }
            
            let values = [
                game.numbers,   // Insère chaque numéro individuellement
                game.stars,     // Insère chaque étoile individuellement
                newCombinations.id_profile
            ];
    
            console.log(values);
            const result = await getSpecificResult(sqlQuery, values);
            results.push(result); // Ajoute le résultat à la liste
        }
    
        return results; // Retourne tous les résultats d'insertion
    },

    async deleteCombinations(id_combination) {
        let sqlQuery = `DELETE FROM public.combinations WHERE id_combinations = $1`;
        let values = [id_combination];
        return await getSpecificResult(sqlQuery, values);
    }
};

module.exports = homeDatamapper;
