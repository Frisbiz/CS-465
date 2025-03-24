
var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel'); // Reference to travlr.js controller

/* GET travel page */
router.get('/', controller.travel); // Use the travel function from the controller

module.exports = router; // Export the router