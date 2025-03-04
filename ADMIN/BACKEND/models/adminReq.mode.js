const mongoose = require('mongoose');

const adminReqSchema1 = new mongoose.Schema({
    name: String,
    email: String
});

const adminReqSchema2 = new mongoose.Schema({
    name: String,
    email: String
});

const adminReq1 = mongoose.model("orders", adminReqSchema1);
const adminReq2 = mongoose.model("users", adminReqSchema2);

module.exports = {adminReq1,adminReq2};