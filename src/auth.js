const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
    throw new Error("JWT_SECRET is missing. Check your .env file.");
}

function generateToken(user) {
    return jwt.sign(
        {
            username: user.username,
            role: user.role
        },
        SECRET,
        { expiresIn: '1h' }
    );
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };
