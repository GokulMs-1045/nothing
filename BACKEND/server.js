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


//ENVIRONMENT VARIABLEs
const PORT = process.env.PORT;

//API's
app.use('/', signupRoutes);

 
// **Start Server**
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
