const { historyDatamapper } = require('../datamappers');

const controller = {
    
            sendResults: async (req, res) => {
                const role_id = req.params.role_id;
                const resultData = req.body;
                if (role_id !== '1') {
                    res.status(403).json('Forbidden');
                    return;
                }
                else {
                const result = await historyDatamapper.getResults(resultData);
                res.json(result);
                };
            
            },

            getHistory: async (req, res) => {
                const id_profile = req.params.id;
                console.log(id_profile);
                const result = await historyDatamapper.getHistory(id_profile);
                res.json(result);
            
            },
    
    };

module.exports = controller;