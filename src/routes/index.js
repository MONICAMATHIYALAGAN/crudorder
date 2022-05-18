'use strict'

const res = require('express/lib/response');

const express = require('express'),
        router = express.Router(),
        bodyparser = require('body-parser');


router.use(bodyparser.json());

router.use('/docs', require('./docs'));
router.use('/orders', require('./orderApi'))

module.exports = router;