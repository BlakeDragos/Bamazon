DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "Target", 1000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("keyboard", "Bestbuy", 100, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mouse", "Microcenter", 50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("monitor", "Newegg", 300, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("case", "Amazon", 60, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mouse pad", "Target", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("powersupply", "Amazon", 20, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("motherboard", "Microcenter", 60, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cpu", "Newegg", 300, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gpu", "Newegg", 500, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ram", "Newegg", 30, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ssd", "Newegg", 100, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("m.2", "Newegg", 190, 5);

SELECT * FROM products;
SELECT * FROM products WHERE stock_quantity<=5;