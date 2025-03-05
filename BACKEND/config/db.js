require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;  // Load DB URL from .env

// Create separate connections for different databases
const UserDetails = mongoose.createConnection(
    `${MONGO_URI}/UserDetails`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const Customer = mongoose.createConnection(
    `${MONGO_URI}/Customer`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const Dealer = mongoose.createConnection(
    `${MONGO_URI}/Dealer`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const Kaipulla = mongoose.createConnection(
    `${MONGO_URI}/Kaipulla`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Export connections instead of mongoose
module.exports = { UserDetails, Customer, Dealer, Kaipulla };
