const { homeDatamapper } = require('../datamappers');

const controller = {

        nextGame: async (req, res) => {
            const result = await homeDatamapper.getNextGame();
            res.json(result);
        
        },

        createNextGame: async (req, res) => {
                const nextGameData = req.body;
                const role_id = req.params.role_id;
                if (role_id !== '1') {
                    res.status(403).json('Forbidden');
                    return;
                }
                else {
                const result = await homeDatamapper.createNextGame(nextGameData);
                res.json(result);
                };

        },

        luckyNumber: async (req, res) => {
            const id_profile = req.params.id;
            const result = await homeDatamapper.getLuckyNumber(id_profile);
            res.json(result);
        
        },

        createLuckyNumber: async (req, res) => {
            const luckyNumberData = req.body;
            const id_profile = req.params.id;
            const newLuckyNumber = {
                    luckyNumberData,
                    id_profile
            };
            const result = await homeDatamapper.createLuckyNumber(newLuckyNumber);
            res.json(result);

        },

        createCombinations: async (req, res) => {
            const combinationsData = req.body;
            const id_profile = req.params.id;
            const newCombinations = {
                combinationsData,
                id_profile
            };
            const result = await homeDatamapper.createCombinations(newCombinations);
            res.json(result);
        
        },

        deleteCombinations: async (req, res) => {
            const id_combination = req.params.id_combination;
            const result = await homeDatamapper.deleteCombinations(id_combination);
            res.json(result);
                
        }
 };

module.exports = controller;