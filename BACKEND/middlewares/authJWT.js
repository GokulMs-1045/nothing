// auth jwt
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_K;

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;  // Get token from cookie

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authenticateJWT;
