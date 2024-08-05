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
        // // Create a new card product
        // const card_name = randomString(10);
        // try {
        //     const response = await axios.post(`${MARQETA_API_URL}/cardproducts`, {
        //         name: card_name,
        //         start_date: today_date,
        //         config: {
        //             poi: {
        //                 ecommerce: false,
        //                 atm: false,
        //                 other: {
        //                     allow: true,
        //                     card_presence_required: false,
        //                     cardholder_presence_required: false
        //                 }
        //             },
        //             transaction_controls: {
        //                 accepted_countries_token: "accept_us_only",
        //                 always_require_pin: false,
        //                 always_require_icc: false,
        //                 allow_gpa_auth: true,
        //                 require_card_not_present_card_security_code: false,
        //                 allow_mcc_group_authorization_controls: true,
        //                 ignore_card_suspended_state: false,
        //                 allow_network_load: false,
        //                 allow_network_load_card_activation: false,
        //                 allow_quasi_cash: false,
        //                 enable_partial_auth_approval: true,
        //                 notification_language: "fra"
        //             },
        //             card_personalization: {
        //                 images: {
        //                     card: {
        //                         name: imageName,
        //                         thermal_color: thermalColor
        //                     }
        //                 },
        //                 payment_instrument: "PHYSICAL_MSR",
        //                 package_id: "0",
        //                 all_zero_card_security_code: false,
        //                 bin_prefix: "111111",
        //                 bulk_ship: false,
        //                 pan_length: "16",
        //                 fulfillment_provider: "PERFECTPLASTIC",
        //             },
        //             selective_auth: {
        //                 sa_mode: 1,
        //                 enable_regex_search_chain: false,
        //                 dmd_location_sensitivity: 0
        //             },
        //             card_life_cycle: {
        //                 activate_upon_issue: true,
        //                 expiration_offset: {
        //                     unit: "YEARS",
        //                     value: 10
        //                 },
        //                 card_service_code: 101,
        //                 update_expiration_upon_activation: false
        //             },
        //             jit_funding: {
        //                 paymentcard_funding_source: {
        //                     enabled: true
        //                 }
        //             },
        //         }
        //     }, {
        //         headers: {
        //             'Authorization': `Basic ${auth}`,
        //             'Content-Type': 'application/json'
        //         }
        //     });

        //     res.status(200).json(response.data);


        // } catch (error) {
        //     console.error('Error creating card product:', error);
        //     res.status(500).json(error.response.data);
        // }



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


module.exports = router;