const express = require('express');
const axios = require('axios');
const router = express.Router();
const keys = require('../keys');
const MARQETA_API_URL = keys.MARQETA_API_URL;
const MARQETA_API_KEY = keys.MARQETA_API_KEY;
const MARQETA_API_SECRET = keys.MARQETA_API_SECRET;

//Endpoint for KYC verification
router.post('/kyc', async (req, res) => {
    const { user_token, manual_override } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/kyc`, {
            user_token: user_token,
            manual_override: manual_override
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error verifying KYC:', error);
        res.status(500).json(error.response.data);
    }
});




module.exports = router;