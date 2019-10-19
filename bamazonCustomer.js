let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connect id as:" + connection.threadId);
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon's bakery department ForGoodnessCakes! Would you like to browse our menu?",
        default: true

    }]).then(function (user) {
        if (user.confirm === true) {
            menu();
        } else {
            console.log("Thank you for shopping at ForGoodnessCakes! See you back soon!");
        }
    })
}

function menu() {
    let query = "Select * FROM items";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + 
            " || Item Name: " + res[i].item_name + 
            " || Item Quantity: " + res[i].item_quantity +
            " || Price: $" + res[i].price);

        }
        requestItem();
    })

}

function requestItem() {
    inquirer.prompt([{
        type: "input",
        name: "itemId",
        message: "Please enter item ID of the product you wish to purchase.",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        type: "input",
        name: "itemNumber",
        message: "How many of the selected item do you wish to purchase?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
        }

    }]).then(function(purchase) {
        connection.query("SELECT * FROM items WHERE item_id=?", purchase.itemId, function(err, res) {
            for (let i = 0; i < res.length; i++) {
                if (purchase.itemNumber > res[i].item_quantity) {
                    console.log("Sorry but we do not have enough in stock available.");
                    startPrompt();

                } else {
                    console.log("You have selected:");
                    console.log("Item:" + res[i].item_name);
                    console.log("Price: $" + res[i].price);
                    console.log("Amount available: " + purchase.itemNumber);
                    console.log("-------------------------");
                    console.log("Total: $" + res[i].price * purchase.itemNumber);
                    
                    let newQuantity = (res[i].item_quantity - purchase.itemNumber);
                    let receiptId = (purchase.itemId);
                    finalPrompt(newQuantity, receiptId);
                }
            }
        });
    });
}

function finalPrompt(newQuantity,receiptId) {
    inquirer.prompt([{
        type: "confirm",
        name: "confirmPurchase",
        message: "Please confirm your purchase.",
        default: true

    }]).then(function(confirmed) {
        if (confirmed.finalPrompt === true) {
            connection.query("UPDATE products SET ? WHERE ?", [{
                item_quantity: newQuantity

            },{item_id: receiptId

            }], function(err, ress) {
            });
            console.log("Thank you and have a wonderful day!");
            startPrompt();

        } else {
            console.log("Transaction complete. Thank you for shopping ForGoodnessCakes! See you back soon!");
            startPrompt();
        }
    });
}
