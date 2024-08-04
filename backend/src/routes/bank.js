const express = require('express');
const axios = require('axios');
const router = express.Router();
const keys = require('../keys');
const MARQETA_API_URL = keys.MARQETA_API_URL;
const MARQETA_API_KEY = keys.MARQETA_API_KEY;
const MARQETA_API_SECRET = keys.MARQETA_API_SECRET;

//Endpoint to simulate Transactions
router.post('/bank/simulatetransaction', async (req, res) => {
    const { card_token, amount } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/simulations/cardtransactions/authorization`, {
            card_token: card_token,
            amount: amount,
            card_acceptor: { mid: "123456890" },
            network: "VISA"
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error simulating transaction:', error);
        res.status(500).json(error.response.data);
    }
});

//Endpoint to create bank account
router.post('/bank/createbankaccount', async (req, res) => {
    const { user_token } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/depositaccounts`, {
            user_token: user_token,
            type: "CHECKING",
            customer_due_diligence:
                [{
                    "question": "dda_002_cdd_01_expmondep",
                    "answer": "2"
                },
                {
                    "question": "dda_002_cdd_02_naics",
                    "answer": "6241"
                }]
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating bank account:', error);
        res.status(500).json(error.response.data);
    }
});


module.exports = router;