-- Drops the wishes_db if it already exists --
DROP DATABASE IF EXISTS bamazon;

-- Create the database bamazon and specified it for use.
CREATE DATABASE bamazon;

USE bamazon;

-- Create the table of products.
CREATE TABLE products (
  item_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(255) NOT NULL,
  department_name varchar(255) NOT NULL,
  price varchar(11) NOT NULL,
  stock_quantity int NOT NULL,
  PRIMARY KEY (item_id)
);

-- Insert a set of records.
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('croissant', 'cafe', '$2', '200');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('latte', 'cafe', '$5', '8');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('toronto', 'cafe', '$0.50', '8000');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('chips', 'cafe', '$4.50', '6');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('cappuccino', 'cafe', '$3', '25');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('wine', 'cafe', '$3', '23409');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Huckleberry Finn', 'books', '$3', '1');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Don Quixote', 'books', '$20', '3');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Robin Hood', 'books', '$11', '1');
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Cannery Road', 'books', '$12', '100000');

SELECT * FROM products;