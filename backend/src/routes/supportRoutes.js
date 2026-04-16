const express = require('express');
const { chatSupport } = require('../controllers/supportController');

const router = express.Router();

router.post('/chat', chatSupport);

module.exports = router;
