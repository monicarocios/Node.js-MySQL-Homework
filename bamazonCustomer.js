// Load the NPM Package inquirer
const inquirer = require("inquirer");

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0210',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query("SELECT item_id, product_name, price FROM products", function (err, result) {
    if (err) throw err;
    console.log(result);
});


// inquirer.prompt([

//     {
//         type: "list",
//         name: "allProducts",
//         choices: ["I made you cookies!", "No lie dude. I'm here to rob you.", "Uh. This is my house... Who are YOU???"]
//     },

// ]).then(function (user) {

//         // If the user guesses the password...
//         if (user.myPassword === "myHouse") {

//             console.log("==============================================");

//         }


//         // If the user doesn't guess the password...
//         else {

//             console.log("othert thing=======");
//         }
//     });


// need to move on with instructions after creating server
// include inquirer in here and make sure i npm install mysql, npm install inquirer