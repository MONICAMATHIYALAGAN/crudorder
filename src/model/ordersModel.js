'use strict'
const Joi = require('joi');
const Logger = require('nodemon/lib/utils/log');

module.exports = {
    Orders: class {
        constructor() {

        }

        async getpgConnect(pool, querytodo){
            return new Promise ((resolve, reject) => {
                pool.connect((err, client, done) => {
                    if(err){
                        console.error('Unable to connect', err);
                        return reject(err);
                    }

                    client.query(querytodo, function(err, result) {

                        done();

                        if (err) {

                            console.error('Got error while executing sql', err)
                            return reject(err);
                        }

                        this.data = result.rows;

                        resolve(this)
                    })
                }
                )
            })

        }

        async getOrders(req, pool) {
            const querytodo = `select * from practice.orders`;

            try {


                this.data = await this.getpgConnect(pool, querytodo);

                console.log('inside data:', this.data)
                
            } catch (e) {
                console.log('error is ', e)
                // next(new errors.InternalServerError(e));
            }

            return (this.data);
        }

        async createOrder(req, pool) {
            const reqdata = req.body
            const querytodo =`INSERT INTO practice.orders(
                            order_id, product_name, cost, order_date, delivery_date)
                            VALUES (${reqdata.order_id},'${reqdata.item_name}',${reqdata.cost},'${reqdata.order_date}','${reqdata.delivery_date}')`;


            
                try {
                        console.log('inside create', querytodo)
                    
                    this.data = await this.getpgConnect(pool, querytodo);
                   
                        return 'Order placed succesfully'  
    
                } catch(e) {
                    console.error('Unable create orders')
                }
        }

        async updateOrder(id, data, pool) {

            const querytodo = `UPDATE practice.orders 
                            SET delivery_date='${data.delivery_date}' WHERE order_id=${id}`;
                try {
                    console.log('inside update', querytodo)
                    this.data = await this.getpgConnect(pool, querytodo);
                        return 'Updated succesfully'
                } catch(e) {
                    console.error('Unable create orders')
                }

        }

        async getOrdersDate(date, pool) {

            const querytodo = `select * from practice.orders 
                            where order_date = '${date}' `;

            try {
                console.log('inside get order date', querytodo)

                this.data = await this.getpgConnect(pool, querytodo);

            } catch(e) {
                console.error('Unable get the orders')
            }

            return (this.data)
        }

        async searchOrder(id, pool) {
            const querytodo = `select * from practice.orders 
                            WHERE order_id=${id};`;
                try {
                    
                    this.data = await this.getpgConnect(pool, querytodo);

                    return(this.data)

                } catch(e) {
                    console.error('Unable create orders')
                    
                }

        }

        async deleteOrder(id, pool) {
            const querytodo = `DELETE FROM practice.orders 
                            WHERE order_id=${id};`;
                try {
                    this.data = await this.getpgConnect(pool, querytodo);
                        return 'Deleted  succesfully'
                    
                } catch(e) {
                    console.error('Unable create orders')
                }

        }

    }
}