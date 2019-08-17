// list of dependencies
require("dotenv").config();
var key = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");


// list the proper credentials for establishing a connection to the sql database
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

//establish connection to the sql database and mysql server
connection.connect(function (err) {
    if (err) throw err;
    start();
});

// global variable used to add multiple purchases to a total amount due
let totalPrice = 0;


//start function connects with mysql, iterates through the elements in the database, and logs the table
//order function is then initiated
function start() {
    connection.query('SELECT item_id, product_name, price FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].item_id + ' || Product: ' + res[i].product_name +
                ' || Price: $' + res[i].price);
        }
        order();
    });
};

//order connects with mysql, initiates inquirer which renders the prompts necessary for users to enter the product
//that they want to purchase and the number of the product desired

function order() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'input',
                    message: 'Please enter the item id of the product'
                },
                {
                    name: 'quantity',
                    type: 'input',
                    message: 'How many of this item would you like to purchase?'

                }
            ])

            //function answer will notify user if quantity desired is insufficient or will fulfill the order,
            //subtract the amount purchased from the stock available, and will notify the user that the order
            //has been fulfilled
            .then(function (answer) {

                var selectedItem = res[parseInt(answer.choice) - 1];

                if (parseInt(selectedItem.stock_quantity) < parseInt(answer.quantity)) {
                    console.log('Insufficent quantity for your purchase order');
                    another();
                } else {

                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: parseInt(selectedItem.stock_quantity) - parseInt(answer.quantity)
                            },
                            {
                                item_id: selectedItem.item_id
                            }
                        ],

                        function (error) {
                            if (error) throw (error);
                            totalPrice += selectedItem.price
                            console.log('\nYour order has been successfully placed' + '\nYour total is: $' + totalPrice * answer.quantity);
                            another();
                        });
                }
            })
    })
};

//another function utilizes inquirer for asking the user if they need to make another purchase and either reinitiates
//the purchase process or terminates the app

function another() {
    inquirer
        .prompt(
            {
                name: 'another',
                type: 'confirm',
                message: 'Would you like to continue shopping?'
            },

        )
        .then(function (answer) {
            if (answer.another === true) {
                start();
            } else {
                console.log('Thanks for shopping with us! Your orders will be shipped promptly.')
                connection.end();
            }
        });

};