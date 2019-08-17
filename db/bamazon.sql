DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(70) NOT NULL,
department_name VARCHAR(70) NOT NULL,
price DECIMAL (8, 2) NOT NULL DEFAULT 0,
stock_quantity INT DEFAULT 0,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sharp 70in UHD FLAT_TV", "Electronics", 4500.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Annoying Rubber Chicken", "Toys", 5.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oakley Crossrange Prizm Sunglasses", "Other", 9.99, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vic Firth SD-10 Swinger Drumsticks", "Sports", 8.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kurouto 10in Japanese Chef Knife", "Housewares", 120.00, 43);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Flannel Longsleeve", "Clothing", 45.00, 398);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NVIDIA GTX 1070", "Electronics", 625.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black & Decker Power Drill", "Hardware", 60.00, 119);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Italian Leather Reclining Sectional Couch", "Furniture", 6230.00, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("St. Croix Avid Ultralight Fishing Rod", "Sports", 135.00, 4);

SELECT * FROM products;