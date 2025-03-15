var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main'); // Reference to main.js controller

/* GET home page. */
router.get('/', ctrlMain.index); // Pass the index function to the get call

module.exports = router;