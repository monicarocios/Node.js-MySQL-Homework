// converted database to inventory table so that it;s hopefully easier to compare answers with database info
// now i need database id chosen by user to console.log(the product they wanted)--> needs to match database item_id
// then need to check inventory of that product and see if quantity selected <= to the amount i have in stock
// display error message if not in stock
// change quantity in database if quantity selected valid


// Load the NPM Package inquirer
const inquirer = require("inquirer");

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0210',
    database: 'bamazon'
});

// connecting to server
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
    } else{
        console.log('connected as id ' + connection.threadId);
        openList();
    };
});

// asking whether user wants to shop
function openList() {
    inquirer.prompt([

        {
            type: 'confirm',
            name: 'openList',
            message: 'Welcome! Would you like to buy something?',
        }

    ]).then(function (response) {
        if (response.openList === true) {
            listItems();
        } else {
            console.log("See you next time!");
        }

    });
};

// grabbing table from database
function listItems() {
    // connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, result) {
    //     if (err) throw err;

    //     // turn database entries into a table to compare with user answers in inquirer
    //     for (let i = 0; i < result.length; i++) {
    //         console.log(`Item ID: ${result[i].item_id} | Product: ${result[i].product_name} | Department: ${result[i].department_name} | Price: ${result[i].price} | Stock: ${result[i].stock_quantity}`);
    //         let stock = result[i].stock_quantity
    //     };

    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        console.table(result);
        let itemsTable = Object.values(result);
        chooseItem(itemsTable);
        
    });
};


// user chooses item by id (list)
function chooseItem(itemsTable) {
    inquirer.prompt([
        {
            type: "input",
            name: "itemId",
            message: "Select the item you wish to purchase by id",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            }
        }
    ]).then(function(response) {
        // limit the number user can input, with console.log("select an item from the list"); and listItems(); --> if NaN
        // if it is a number, then chooseQuantity()
        console.log(`Your item id is: ${response.itemId}`);
        if (response.itemId > itemsTable.length) {
            console.log("Please choose an existing item");
            listItems();

        } else {
            const index = response.itemId - 1;
            chooseQuantity(itemsTable, index);
        }
    });
};


// next function needed to query database has to match the id given in user input
// function chooseQuantity (){

function chooseQuantity(itemsTable, index) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            }
        }
    ]).then(function (response) {
        if (response.quantity <= itemsTable[index].stock_quantity) {
            console.log("--------------------------------------------------------------------");
            console.log(`You purchased: ${response.quantity} ${itemsTable[index].product_name} for ${itemsTable[index].price} each`);
            updateInventory(itemsTable[index].item_id, itemsTable[index].stock_quantity, response.quantity, itemsTable[index].product_name);

        } else {
            console.log("We don't have enough of that item in stock, please choose a smaller amount to purchase.");
            chooseQuantity();
        }
    });
};

// update inventory

function updateInventory(item_id, stock_quantity, chooseQuantity, product_name) {
    let newQuantity = stock_quantity - chooseQuantity;
    const query = connection.query(
        "UPDATE products SET stock_quantity=" + newQuantity + " WHERE item_id = " + item_id + ";",
        function (err, res) {
            if (err) {
                throw err;
            } else{
                console.log(`Only ${newQuantity} ${product_name}'s remaining.`)
            }
        });
};