const express = require('express');
const axios = require('axios');
const router = express.Router();
const keys = require('../keys');
const MARQETA_API_URL = keys.MARQETA_API_URL;
const MARQETA_API_KEY = keys.MARQETA_API_KEY;
const MARQETA_API_SECRET = keys.MARQETA_API_SECRET;
const PROGRAM_TOKEN = keys.PROGRAM_TOKEN;


// All the User related routes go here

// Endpoint to get user
router.get('/users', async (req, res) => {
    try {
        const response = await axios.get(`${MARQETA_API_URL}/users`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching cardholders:', error);
        res.status(500).json(error.response.data);
    }
});

// Endpoint to create a user
router.post('/users/createuser', async (req, res) => {
    const { first_name, last_name, email, password, gender } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/users`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            identifications: [{
                "type": "SSN",
                "value": "111234444"
            }],
            birth_date: "1991-01-01",
            address1: "1234 Grove Street",
            city: "Berkeley",
            state: "CA",
            country: "USA",
            postal_code: "94702",
            phone: "15105551212",
            gender: gender,
            uses_parent_account: false,
            metadata: {
                "notification_email": "jane.doe@home.com",
                "notification_language": "spa",
                "authentication_question1": "What was your first job?",
                "authentication_question2": "What make was your first car?",
                "authentication_question3": "What is your favorite color?",
                "authentication_answer1": "Cashier",
                "authentication_answer2": "Trabant",
                "authentication_answer3": "Blue"
            }
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating cardholder:', error);
        res.status(500).json(error);
    }
});

// Endpoint to get users cards
router.post('/users/cards', async (req, res) => {
    const { user_token, show_cvv } = req.body;
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
        const card_token = inital_response.data.data[0].token;
        console.log("Fetching card number/details");
        const response = await axios.get(`${MARQETA_API_URL}/cards/${card_token}/showpan?show_cvv_number=${show_cvv}`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        const data = response.data;
        const transformed_data = {
            Name: name_response.data.first_name + " " + name_response.data.last_name,
            PAN: data.pan,
            expiry: data.expiration.slice(0, 2) + "/" + data.expiration.slice(2),
            cvv: show_cvv ? data.cvv_number : "***",
            image: data.fulfillment.card_personalization.images.card.name,
            character: data.fulfillment.card_personalization.images.card.thermal_color
        }



        console.log(transformed_data);
        res.status(200).json(transformed_data);

        // res.json(response.data);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json(error.response.data);
    }
});

//Endpoint to retrieve users
router.post('/users', async (req, res) => {
    const { user_token } = req.body;
    try {
        const response = await axios.get(`${MARQETA_API_URL}/users/${user_token}`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json(error.response.data);
    }
});

//Endpoint to get users balance
router.post('/users/balance', async (req, res) => {
    const { user_token } = req.body;
    try {
        const response = await axios.get(`${MARQETA_API_URL}/balances/${user_token}`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json(error.response.data);
    }
});

//Endpoint to fund Users GPA
router.post('/users/fundgpa', async (req, res) => {
    const { user_token, amount } = req.body;
    program_token = PROGRAM_TOKEN
    try {
        const response = await axios.post(`${MARQETA_API_URL}/gpaorders`, {
            user_token: user_token,
            amount: amount,
            currency_code: "USD",
            funding_source_token: program_token
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error funding GPA:', error);
        res.status(500).json(error.response.data);
    }
});



//Endpoints to login User
router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await axios.post(`${MARQETA_API_URL}/users/auth/login`, {
            email: email,
            password: password
        }, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        console.log(MARQETA_API_URL);
        res.json(response.data);

    } catch (error) {
        console.error('Error logging in:', error);
        console.log(MARQETA_API_URL);
        res.status(500).json(error.response.date);

    }
});

// Endpoint to get transactions
router.post('/users/transactions', async (req, res) => {
    console.log("Fetching transactions");

    const { user_token } = req.body;
    try {
        //transactions?user_token=382fa145-c96c-4f96-a217-bca5e6ce3b63
        //transactions?user_token=${user_token}
        console.log(user_token);
        const response = await axios.get(`${MARQETA_API_URL}/transactions?user_token=${user_token}`, {
            auth: {
                username: MARQETA_API_KEY,
                password: MARQETA_API_SECRET
            }
        });
        console.log(response.data);
        console.log(response.data.data);
        console.log(user_token)
        res.status(200).json(response.data.data);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json(error.response.data);
    }
});

module.exports = router;