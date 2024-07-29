const express = require('express');
const axios = require('axios');
const router = express.Router();
const keys = require('../keys');
const MARQETA_API_URL = keys.MARQETA_API_URL;
const MARQETA_API_KEY = keys.MARQETA_API_KEY;
const MARQETA_API_SECRET = keys.MARQETA_API_SECRET;

//Endpoint to create ACH Source (Requires full marqeta account)
router.post('/fundingsource/ach', async (req, res) => {
    const { user_token, name_on_account } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/fundingsources/ach`, {
            user_token: user_token,
            account_number: "987654321",
            routing_number: "121000358",
            name_on_account: name_on_account,
            is_default_account: true,
            account_type: "savings",
            verification_notes: "Noted",
            verification_override: true
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating ACH source:', error);
        res.status(500).send('Internal Server Error');
    }
});
//Endpoint to get Funding Sources Addresss
router.post('/fundingsource/address', async (req, res) => {
    const { user_token } = req.body;
    try {
        const response = await axios.get(`${MARQETA_API_URL}/fundingsources/addresses/user/${user_token}`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Funding Sources Address:', error);
        res.status(500).send('Internal Server Error');
    }
});
//Endpoint to create payment card source
router.post('/fundingsource/paymentcard', async (req, res) => {
    const { user_token } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/fundingsources/paymentcard`, {
            user_token: user_token,
            is_default_account: true,
            account_number: "6559906559906557",
            exp_date: "1227",
            cvv_number: "123"
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment card source:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;