require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;  // Load DB URL from .env

// Create separate connections for different databases
const UserDetails = mongoose.createConnection(
    `${DB_URL}/UserDetails`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const Customer = mongoose.createConnection(
    `${DB_URL}/Customer`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const Dealer = mongoose.createConnection(
    `${DB_URL}/Dealer`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const Kaipulla = mongoose.createConnection(
    `${DB_URL}/Kaipulla`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Export connections instead of mongoose
module.exports = { UserDetails, Customer, Dealer, Kaipulla };
