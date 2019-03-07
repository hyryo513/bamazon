var inquirer = require("inquirer");
var knex = require('knex')({
    client: 'mysql',
    connection: {
      socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
      user : 'root',
      password : 'root',
      database : 'bamazon'
    }
  });

var cTable = require('console.table');

function mainFunction(){
  inquirer.prompt([
    {
    type: "list",
    name: "option",
    message: "Please select the option",
    choices: ["View Low Inventory <100", "Add to Inventory", "Add New Product", "Exit"]
    }]
    ).then(function(response){
        switch(response.option){
            case "View Low Inventory <100":
                showLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit":
                knex.destroy();
                break;
        };
    });
};

function showInventory(){
    knex.select('*').from('products').then(function(rows){
        var table = cTable.getTable(rows);
        console.log(table);
        mainFunction();
        }).catch(function(error) {
        console.error(error)
        });
};

function showLowInventory(){
    knex.select('*').from('products').where('stock_quantity', '<', 100).then(function(rows){
        var table = cTable.getTable(rows);
        console.log(table);
        mainFunction();
        }).catch(function(error) {
        console.error(error)
        });
};

function addInventory(){
    inquirer.prompt([
    {
        type: "input",
        name: "productID",
        message: "Please enter Product ID to add"
    },
    {
        type: "input",
        name: "addQuantity",
        message: "How many do you want to add?"
    }
    ]).then(function(response){
        knex.select('stock_quantity', 'product_name').from('products').where('id', response.productID).then(function(rows){
            var newQuantity = rows[0].stock_quantity + parseInt(response.addQuantity);
            knex.table('products').where('id', response.productID).update({
                stock_quantity: newQuantity
            }).then(function(){
                console.log("Inventory is added for " + rows[0].product_name + "!");
                showInventory();
              }).catch(function(error){
                console.error(error)
            });
            }).catch(function(error) {
            console.error(error)
        });
    });
};

function addProduct(){
    inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "Please select the department for the new product",
            choices: ["Camping Equipment", "Mountaineering Equipment", "Outdoor Protection"]
        },
        {
            type: "input",
            name: "productName",
            message: "Please type the name for the new product"
        },
        {
            type: "input",
            name: "productPrice",
            message: "Please enter the prices for the new product"
        },
        {
            type: "input",
            name: "productStock",
            message: "Please enter the stock quantity for the new product"
        }
        ]).then(function(response){
            knex('products').insert(
                {
                    department_name: response.department,
                    product_name: response.productName,
                    price: response.productPrice,
                    stock_quantity: response.productStock,
                    product_sales: 0     
                }
            ).then(function(){
                console.log("New product is added!");
                showInventory();
            }).catch(function(error) {
                console.error(error)
            });
    });
};

showInventory();

