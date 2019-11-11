const fs = require('fs');
const path = require('path');
const db = require('../util/database');

const p = path.join(path.dirname(process.mainModule.filename), 'data',
    'cart.json'
);

module.exports = class cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        db.query(`SELECT * FROM cart WHERE prod_id = ${id}`, (err, result)=>{
            if(err)throw err;

            //Analyze the cart => Find existing file
            const exist = result[0];
            
            // Add new product/ increase quality
            if(!exist){
                db.query(`INSERT INTO cart(prod_id) VALUES(${id})`, (err, result)=>{
                    if(err)throw err;
                })
            }
            else{
                const newQty = exist.qty+1;
                db.query(`UPDATE cart SET qty = ${newQty} WHERE prod_id = ${exist.prod_id}`, (err, result)=>{
                    if(err)throw err;
                })
            }
        })   
    }

    static deleteProduct(id){
        db.query(`DELETE FROM cart WHERE prod_id = ${id}`, (err, result)=>{
            if(err) throw err;
        })
    }

    static getCart(cb){
        db.query(`SELECT * FROM cart JOIN products ON prod_id = id`, (err, result)=>{
            if(err) throw err;
            cb(result);
        })
    }

}