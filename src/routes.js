const express = require('express');
const router = express.Router();

router.get('/public', (req, res) => {
    res.json({ message: "Public endpoint working" });
});

router.get('/admin', (req, res) => {
    res.json({ secret: "Sensitive admin data" });
});

module.exports = router;