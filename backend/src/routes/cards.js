const express = require('express');
const axios = require('axios');
const router = express.Router();
const keys = require('../keys');
const MARQETA_API_URL = keys.MARQETA_API_URL;
const MARQETA_API_KEY = keys.MARQETA_API_KEY;
const MARQETA_API_SECRET = keys.MARQETA_API_SECRET;

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
            },
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json(error.response.data);
    }
});


module.exports = router;