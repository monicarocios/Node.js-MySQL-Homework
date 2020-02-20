# Node.js-MySQL-Homework

## About
Bamazon is an Amazon-like storefront that take in orders from customers and depletes stock from our store's inventory.

Customers can select a product by id, input the amount that they would like to purchase, and complete their order! After completing an order, the database is updated, reflecting the lower product stock available after the purchase. 

## How it Works

### 1. Select an item by id, then input the amount you would like to purchase. 

![Demo](https://github.com/monicarocios/Node.js-MySQL-Homework/blob/master/demo/bamazon_demo.gif)

### 2. Our database updates once you purchase a valid quantity (does not exceed stock)

![Demo](https://github.com/monicarocios/Node.js-MySQL-Homework/blob/master/demo/update_function_db.gif)

## Warnings

### 1. This warning will show if you select an id that does not exist in our inventory

![Demo](https://github.com/monicarocios/Node.js-MySQL-Homework/blob/master/demo/select_item_warning.gif)

### 2. This warning will show if the quantity you select exceeds the amount of that product that we have in stock

![Demo](https://github.com/monicarocios/Node.js-MySQL-Homework/blob/master/demo/quantity_exceeds_stock_warning.gif)


## Frameworks Used

* [JavaScript](https://www.javascript.com/)
  * [Node.js](https://nodejs.org/en/)
      * Node packages:
        * [mysql](https://www.npmjs.com/package/mysql)
        * [inquirer](https://www.npmjs.com/package/inquirer)
        
 