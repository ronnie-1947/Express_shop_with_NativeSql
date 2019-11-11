const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(id){
        if(!id){
            db.query('INSERT INTO products SET?', this, (err, result, field)=>{
                if(err) throw err;
            })
        }
        else{
            db.query(`
            UPDATE products SET 
            title = '${this.title}',
            price = ${this.price},
            imageUrl = '${this.imageUrl}',
            description = '${this.description}',
            updated_at = NOW()
            WHERE id = ${id}
            `, (err, result)=>{
                if(err)throw err;
            })
        }
    }


    static fetchAll(cb){
        db.query('SELECT * FROM products', (err, result, field)=>{
            cb(result);
        })
    }

    static findById(id, cb){
        db.query(`SELECT * FROM products WHERE id = ${id}`, (err, result)=>{
            if(err)throw err;
            cb(result[0]);
            // console.log(result[0]);
        })
    }

    static deleteById(id){
        db.query(`DELETE FROM products WHERE id = ${id}`, (err, result, field)=>{
            if(err) throw err;
        })
    }
}