require("dotenv").config();
var key = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    //port
    port: 3306,

    //username
    user: "root",

    //password
    password: key.password.id,
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    manage();
});

function manage() {
    inquirer.prompt([

        {
            type: "input",
            name: "managerID",
            message: "Enter your manager ID:"
        },

        {
            type: "list",
            name: "action",
            message: "\nWhat would you like to view?\n",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Management Complete"]
        }
    ])
        .then(function (answer) {
            switch (answer.action) {

                case "View Products for Sale":
                    viewAll();
                    break;

                case "View Low Inventory":
                    viewLow();
                    break;

                case "Add to Inventory":
                    stockItem();
                    break;

                case "Add New Product":
                    addNew();
                    break;

                case "Management Complete":
                    connection.end();
                    break;

                default:
            }
        })
};

function viewAll() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('\nItem ID: ' + res[i].item_id + ' || Product: ' + res[i].product_name +
                ' || Price: $' + res[i].price + ' || In-Stock: ' + res[i].stock_quantity);
        }
        manage();
    });
};

function viewLow() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('\nItem ID: ' + res[i].item_id + ' || Product: ' + res[i].product_name +
                ' || Price: $' + res[i].price + ' || In-Stock: ' + res[i].stock_quantity);
        }
        manage();
    });
};

function stockItem() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "rawlist",
                        choices: function () {
                            var choiceArr = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArr.push(res[i].product_name);
                            }
                            return choiceArr;
                        },
                        message: "Which item would you like to restock?"
                    },
                    {
                        name: 'quantity',
                        type: 'input',
                        message: 'Enter quantity of item stock: '
                    }
                ])
                .then(function (answer) {
                    var selectedItem;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].product_name === answer.choice) {
                            selectedItem = res[i];

                        }
                    }

                    connection.query('UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: selectedItem.stock_quantity + parseInt(answer.quantity)
                            },
                            {
                                item_id: selectedItem.item_id
                            }
                        ],

                        function (error) {
                            if (error) throw (error);
                            console.log('\nItem stock has been successfully updated.' + '\nItem Stock Quantity is currently: ' + (selectedItem.stock_quantity + parseInt(answer.quantity)));
                            manage();
                        })
                })
        })
    };

    function addNew() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            inquirer
            .prompt([
                {
                    name: "new product",
                    type: "input",
                    message: "What is the name of the product to be added to the inventory?"
                },
                {
                    name: "department",
                    type: "input",
                    message: "In what department will the new product be listed?"
                },
                {
                    name: "price",
                    type: "input",
                    message: "What is the retail price for the new product?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many of this new item will be stocked into the inventory?"
                },
            ])
            .then(function (answer) {
                
            })

        })
    }