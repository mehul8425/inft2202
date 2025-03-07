const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to My Web Server');
});

router.get('/about', (req, res) => {
    res.send('About Us Page');
});

router.get('/contact', (req, res) => {
    res.send('Contact Page');
});

module.exports = router;
