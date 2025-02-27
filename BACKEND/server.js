require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",// Frontend URL
        credentials: true,
    })
);

//DB CONNECTION
require("./config/db");

//ROUTES
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const orderProductRoutes = require("./routes/orderProductRoutes");
const userCartRoutes = require('./routes/userCartRoutes');

//ENVIRONMENT VARIABLEs
const PORT = process.env.PORT;

//API's
app.use('/', signupRoutes);
app.use('/login', loginRoutes);
app.use('/',orderProductRoutes);
app.use('/',userCartRoutes);

// **Start Server**
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
