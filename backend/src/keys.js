require('dotenv').config();

module.exports = {
    MARQETA_API_URL: process.env.API_URL,
    MARQETA_API_KEY: process.env.API_KEY,
    MARQETA_API_SECRET: process.env.API_SECRET,
    PROGRAM_TOKEN: process.env.PROGRAM_TOKEN,
    CARD_PRODUCT_TOKEN: process.env.CARD_PRODUCT_TOKEN
};