const { historyDatamapper } = require('../datamappers');
const { homeDatamapper } = require('../datamappers');
const { getLoss, editLoss } = require('../datamappers/history.datamappers');

const controller = {
    
            sendResults: async (req, res) => {
                try {
                const resultData = req.body;
                const newResult = await historyDatamapper.postResults(resultData);
                const updatedCombinations = await homeDatamapper.updateResultCombinations(resultData);
                res.status(201).json({
                    message: 'Result added and gains updated successfully.',
                    result: newResult,
                            updatedCombinations,
                }); 
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ 
                        message: 'An error occurred while adding result and updating gains.' });
                }
            
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
            
            },

            getLoss: async (req, res) => {
                const id_profile = req.params.id;
                const result = await historyDatamapper.getLoss(id_profile);
                res.json(result);
            
            },

            editLoss: async (req, res) => {
                const id_profile = req.params.id;
                const loss = req.body;
                const result = await historyDatamapper.editLoss(id_profile, loss);
                res.json(result);
            
            }
    
    };

module.exports = controller;