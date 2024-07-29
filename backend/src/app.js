require('dotenv').config();
const express = require('express');
const axios = require('axios');
const keys = require('./keys');
const app = express();
const port = 5000;

const MARQETA_API_URL = keys.MARQETA_API_URL;
const MARQETA_API_KEY = keys.MARQETA_API_KEY;
const MARQETA_API_SECRET = keys.MARQETA_API_SECRET;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const bankRoutes = require('./routes/bank');
const kycRoutes = require('./routes/kyc');
const fundingSourceRoutes = require('./routes/fundingsource');


app.use('/api', userRoutes);
app.use('/api', cardRoutes);
app.use('/api', bankRoutes);
app.use('/api', kycRoutes);
app.use('/api', fundingSourceRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});