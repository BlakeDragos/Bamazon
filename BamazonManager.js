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

function fullTable() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var products = [];
        for (var i = 0; i < results.length; i++) {
            products.push(results[i]);
        }
        console.table(products);
        start();
    });
}

function start() {
    inquirer
        .prompt([{
            name: "choice",
            type: "list",
            message: "What action would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]

        }])
        .then(function (answer) {
            if (answer.choice === "View Products for Sale") {
                fullTable();
            }
            else if (answer.choice === "View Low Inventory") {
                lowInventory();
            }
            else if (answer.choice === "Add to Inventory") {
                addInventory();
            }
            else if (answer.choice === "Add New Product") {
                addProduct();
            }
            else {
                connection.end();
            }

        });
}

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity<=5;";
    connection.query(query, function (err, res) {
        var products = [];
        for (var i = 0; i < res.length; i++) {
            products.push(res[i]);
        }
        console.table(products);
        start();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var chosenStock;
        inquirer
            .prompt([{
                name: "id",
                type: "input",
                message: "What is the id of the item you would like to re-stock?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }])
            .then(function (answer) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].id === parseInt(answer.id)) {
                        chosenStock = results[i];
                    }
                }
                var NewQuantity = parseInt(chosenStock.stock_quantity) + parseInt(answer.amount);
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
                        console.log("\n------------------------------------------------");
                        console.log("Your stocking was successfull!");
                        console.log("\n------------------------------------------------");
                        start();

                    });
            })
    })
}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the name of the item you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What department is it in?"
            },
            {
                name: "price",
                type: "input",
                message: "How much is it?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock",
                type: "input",
                message: "How many are you adding?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price || 0,
                    stock_quantity: answer.stock || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was added successfully!");
                    start();
                }
            );
        });
}