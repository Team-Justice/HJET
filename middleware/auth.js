/**
 * Used to guard routes
 */

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        // check if token exists
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401).json({ message: "No authentication token, authorization denied." });
        }

        // check if token is valid
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: "Token verification failed, authorization denied." });
        }

        // pass id to whatever handles the request next
        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = auth;