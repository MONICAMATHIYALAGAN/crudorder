const express = require('express'),
    router = express.Router(),
    bodyparser = require('body-parser'),
    model = require('../model/ordersModel'),
    errors = require('throw.js'),
    pg = require('pg');


    const pool = new pg.Pool({user:process.env.PGUSER},
        {database: process.env.PGDATABASE},
        {password: process.env.PGPASSWORD},
        {port: process.env.PORT});

router.use(bodyparser.json());

const Model = new model.Orders();

const getOrders = async function(req, res, next) {
    try{

        const response = await Model.getOrders(req, pool);
        res.json(response)

    } catch (e) {
        next(new errors.InternalServerError(e));
    }
}

router.get('/getOrders', getOrders);

createOrder = async function(req, res, next) {
    
    try {
        const response = await Model.createOrder(req, pool);
        res.json(response);
    } catch (e) {
        next ( new errors.InternalServerError(e));
    }
}

router.post('/create', createOrder);

updateOrder = async function(req, res, next) {
    try {
        const response = await Model.updateOrder(req.params.id, req.body, pool);
        res.json(response);
    } catch (e) {
        next ( new errors.InternalServerError(e));
    }
}

router.post('/update/:id', updateOrder);

const getOrdersDate = async function(req, res, next) {
    try {
        const response = await Model.getOrdersDate(req.params.date, pool);
        res.json(response.data);
    } catch (e) {
        next ( new errors.InternalServerError(e));
    } 
}

router.get('/list/:date', getOrdersDate);

searchOrder = async function(req, res, next) {
    try {
        const response = await Model.searchOrder(req.params.id, pool);
        res.json(response.data);
    } catch (e) {
        next ( new errors.InternalServerError(e));
    }
}

router.get('/search/:id', searchOrder);

deleteOrder = async function(req, res, next) {
    try {
        const response = await Model.deleteOrder(req.query.id, pool);
        res.json(response);
    } catch (e) {
        next ( new errors.InternalServerError());
    }
}

router.delete('/delete', deleteOrder);

module.exports = router

