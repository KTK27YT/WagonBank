const express = require('express');
const axios = require('axios');
const router = express.Router();
const keys = require('../keys');
const MARQETA_API_URL = keys.MARQETA_API_URL;
const MARQETA_API_KEY = keys.MARQETA_API_KEY;
const MARQETA_API_SECRET = keys.MARQETA_API_SECRET;
const { randomString, todayDate } = require('../utils');
const auth = Buffer.from('${MARQETA_API_KEY}:${MARQETA_API_SECRET}').toString('base64');






// Endpoint to get cardProducts
router.get('/cards/cardproducts', async (req, res) => {
    try {
        const response = await axios.get(`${MARQETA_API_URL}/cardproducts`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching cardProducts:', error);
        res.status(500).json(error.response.data);
    }
});

//Endpoint to create cards
router.post('/cards/createcard', async (req, res) => {
    const { user_token, imageName, thermalColor } = req.body;
    const card_token = null;
    const today_date = todayDate();
    try {


        const response = await axios.post(`${MARQETA_API_URL}/cards`, {
            user_token: user_token,
            card_product_token: "136893dc-737e-409a-aeb6-1e1576787468",
            fulfillment: {
                card_personalization: {
                    images: {
                        card: {
                            name: imageName,
                            thermal_color: thermalColor
                        },
                    }
                }
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            },
            params: {
                sort_by: '-lastModifiedTime'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json(error.response.data);
    }
});

//Endpoint to cause a Transaction
router.post('/cards/simulatetransaction', async (req, res) => {
    const { card_token, amount, mid } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/simulations/cardtransactions/authorization`, {
            card_token: card_token,
            amount: amount,
            card_acceptor: {
                mid: mid
            },
            network: "VISA"

        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error causing transaction:', error);
        res.status(500).json(error.response.data);
    }
});

router.post('/cards/cardtoken', async (req, res) => {
    const { user_token } = req.body;
    try {
        const name_response = await axios.get(`${MARQETA_API_URL}/users/${user_token}`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });

        const inital_response = await axios.get(`${MARQETA_API_URL}/cards/user/${user_token}`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        console.log(inital_response.data);
        const card_token = inital_response.data.data[0].token

        console.log(card_token);
        res.json(card_token);
    } catch (error) {
        console.error('Error fetching card:', error);
        res.status(500).json(error.response.data);
    }
});


module.exports = router;