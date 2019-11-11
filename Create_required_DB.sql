-- DROP DATABASE express_shop;
CREATE DATABASE express_shop;

USE express_shop ;

CREATE TABLE products(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    price DECIMAL(7, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cart(
	prod_id INT NOT NULL,
    qty INT DEFAULT 1,
    FOREIGN KEY(prod_id) REFERENCES products(id)
);