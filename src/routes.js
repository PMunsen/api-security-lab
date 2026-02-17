const express = require('express');
const router = express.Router();
const { generateToken, authenticateToken } = require('./auth');

const fakeUser = {
    username: "admin",
    password: "password123",
    role: "admin"
};

router.get('/public', (req, res) => {
    res.json({ message: "Public endpoint working" });
});

router.post('/login', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body required" });
    }
    const { username, password } = req.body;

    if (username === fakeUser.username && password === fakeUser.password) {
        const token = generateToken(fakeUser);
        return res.json({ token });
    }
    res.status(401).json({ error: "Invalid credentials" });
});

router.get('/admin', authenticateToken, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Admins only" });
    }

    res.json({
        message: "Admin access granted",
        user: req.user
    });
});


module.exports = router;