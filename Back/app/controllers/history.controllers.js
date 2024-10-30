const { historyDatamapper } = require('../datamappers');

const controller = {
    
            sendResults: async (req, res) => {
                const resultData = req.body;
                const result = await historyDatamapper.postResults(resultData);
                res.json(result); 
            
            },

            getResult: async (_ , res) => {
                const result = await historyDatamapper.getLastResult();
                res.json(result);
            },

            getResults: async (req , res) => {
                const reference_date = req.body;
                const result = await historyDatamapper.getSpecificResult(reference_date);
                res.json(result);
            },

            getHistory: async (req, res) => {
                const id_profile = req.params.id;
                const result = await historyDatamapper.getHistory(id_profile);
                res.json(result);
            
            },

            getSpecificHistory: async (req, res) => {
                const id_profile = req.params.id;
                const reference_date = req.params.reference_date;
                const result = await historyDatamapper.getSpecificHistory(id_profile, reference_date);
                res.json(result);
            
            }
    
    };

module.exports = controller;