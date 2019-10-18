var express = require('express');
var router = express.Router();
var checkoutCtrl = require('../controllers/checkout')

router.post('/', checkoutCtrl.checkout);

module.exports = router