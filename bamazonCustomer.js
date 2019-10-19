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

function menu() {
    let query = "Select * FROM items";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " || Item Name: " + 
                        res[i].item_name + " || Price: " + res[i].price);
                        
        }
    })

}