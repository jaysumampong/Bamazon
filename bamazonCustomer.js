let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connect id as:" + connection.threadId);
    startPrompt();
});

function startPrompt() {
    inquirer.prompt ([{
        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon's bakery department ForGoodnessCakes! Would you like to browse our menu?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            menu();
        } else {
            console.log("Thank you for shopping at ForGoodnessCakes! See you back soon!");
        }
    })
}