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

    ]).then(function (answers) {
        if (answers.openList === true) {
            listItems();
        } else {
            console.log("See you next time!");
        }

    });
};



// grabbing table from database
function listItems() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, result) {
        if (err) throw err;

        // turn database entries into a table to compare with user answers in inquirer
        for (let i = 0; i < result.length; i++) {
            console.log(`Item ID: ${result[i].item_id} | Product: ${result[i].product_name} | Department: ${result[i].department_name} | Price: ${result[i].price} | Stock: ${result[i].stock_quantity}`);
        };
        chooseItem();
    });
};

// user chooses item by id (list)
function chooseItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemId",
            message: "Select the item you wish to purchase by id",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value)) && value<=10;
                return valid || 'Please enter a number';
            },
            filter: Number
        }
    ])
};

    
    // .then(
    //     function(answers){
    //         matchName();
    //     }
    // );

    // function for matching item_id's with product_name in mysql
    // function matchName (){
    //     if(answers.itemId === )
    //     connection.query("SELECT item_id, product_name, price FROM products", function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         chooseItem();
    // }


    // customer selects quantity of product needed
//     function selectQuantity() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "quantity",
//             message: "How many would you like?",
//             validate: function (value) {
//                 var valid = !isNaN(parseFloat(value));
//                 return valid || 'Please enter a number';
//             },
//             filter: Number
//         }
//     ]);
// };


    // {
        // check on the product and if there's enough of it 
        // if answers.quantity < or = to item quantity in database, then subtract item quanitity-answers.quantity in database

    //     when: function (answers) {
    //         return answers. !== 'Nope, all good!';

    // }.then(function (user) {

//         // If store has enough of the product user chose...
//         if (quantity) {

//             console.log("==============================================");

//         }


//         // If the user doesn't guess the password...
//         else {

//             console.log("othert thing=======");
//         }
// //     });

// };


// need to move on with instructions after creating server
// include inquirer in here and make sure i npm install mysql, npm install inquirer
// how do you select specific item quantity available in database to see if user asked for less than what is available