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



// listing all items in console
function listItems() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, result) {
        if (err) throw err;
        console.log(result);
        chooseItem();
    });
};

// user chooses item by id (list)
function chooseItem() {
inquirer.prompt([

    {
        type: 'expand',
        name: 'item_id',
        message: 'Choose which item you would like to purchase by selecting an item id from the list:',
        choices: [
            {
                key: '1',
                name: 'croissant',
                value: 'croissant'
            },
            {
                key: '2',
                name: 'latte',
                value: 'latte'
            },
            {
                key: '3',
                name: 'toronto',
                value: 'toronto'
            },
            {
                key: '4',
                name: 'chips',
                value: 'chips'
            },
            {
                key: '5',
                name: 'cappuccino',
                value: 'cappuccino'
            },
            {
                key: '6',
                name: 'wine',
                value: 'wine'
            },
            {
                key: '7',
                name: 'Huckleberry Finn',
                value: 'Huckleberry Finn'
            },
            
            {
                key: '8',
                name: 'Don Quixote',
                value: 'Don Quixote'
            },
            {
                key: '9',
                name: 'Robin Hood',
                value: 'Robin Hood'
            },
            {
                key: '10',
                name: 'Cannery Road',
                value: 'Cannery Road'
            },
        ]
    },
])};

// customer selects quantity of product needed
function selectQuantity() {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        }
    ]);
};


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