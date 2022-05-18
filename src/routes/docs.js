'use strict';

const express = require('express'),
    router = express.Router(),
    swaggerUi = require('swagger-ui-express'),
    yaml = require('yaml'),
    fs = require('fs'),
    path = require('path'),

    swaggerFile = path.join(__dirname, 'swagger.yaml'),
    swaggerData = fs.readFileSync(swaggerFile, 'utf8'),

    customCss = fs.readFileSync((path.join(__dirname, 'docs.css')), 'utf8'),

    swaggerDocument = yaml.parse(swaggerData);

router.use('/', swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, false, null, customCss));

module.exports = router;



