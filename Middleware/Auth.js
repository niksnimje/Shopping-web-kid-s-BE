const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const { verificationToken } = req.cookies;

    if (!verificationToken) {
        return res.status(401).json({ message: "You are not authenticated! Please login again." });
    }

    jwt.verify(verificationToken, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token, please log in again." });
        }

        req.user = decoded.userData;
        console.log("Decoded User Data:", req.user); // ✅ Debugging

        if (!req.user.role) {
            return res.status(400).json({ message: "Role is missing in token!" });
        }

        next();
    });
};

module.exports = isAuth;
