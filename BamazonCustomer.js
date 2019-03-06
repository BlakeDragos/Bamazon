var mysql = require("mysql");
var inquirer = require("inquirer");
var chosenItem;

var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,

    // username
    user: "root",

    // password
    password: "Filbert_8",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var products = [];
        for (var i = 0; i < results.length; i++) {
            products.push(results[i]);
        }
        console.table(products);
        inquirer
            .prompt([{
                name: "id",
                type: "input",
                message: "What is the id of the product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "NumUnits",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }])
            .then(function (answer) {
                search(answer);

            });

    })
}

function search(answer) {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            if (results[i].id === parseInt(answer.id)) {
                chosenItem = results[i];
            };
        };
        if ( parseInt(chosenItem.stock_quantity) < parseInt(answer.NumUnits)) {
            console.log("Sorry Insufficient quantity");
            start();
        } else {
            var NewQuantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.NumUnits)
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: NewQuantity
                    },
                    {
                        id: parseInt(answer.id)
                    }
                ],
                function (error) {
                    if (error) throw err;
                    console.log("Purchase was successfull! your total is: " + (parseInt(chosenItem.price) * parseInt(answer.NumUnits)));
                    connection.end();
                }
            );
        };
    });
}