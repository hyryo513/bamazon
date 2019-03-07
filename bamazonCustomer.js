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

var productIDArray = [];

var cTable = require('console.table');

function showInventory(){
  productIDArray = [];
  knex.select('*').from('products').then(function(rows){
    rows.forEach(element => {
      productIDArray.push(element.id);
    });
    var table = cTable.getTable(rows);
    console.log(table);
    mainFunction();   
    }).catch(function(error) {
    console.error(error)
    });
};

function mainFunction(){
  inquirer.prompt([
    {
    type: "list",
    name: "option",
    message: "Please select the option",
    choices: ["Purchase Product", "Exit"]
    }]
    ).then(function(response){
        switch(response.option){
            case "Purchase Product":
                purchaseFunction();
                break;
            case "Exit":
                knex.destroy();
                break;
        };
    });
};

function purchaseFunction(){
  inquirer.prompt([
        {
          type: "input",
          name: "productID",
          message: "Please enter the product ID you would like to purchase",
          validate: validateProductID
        },
        {
          type: "input",
          name: "quantity",
          message: "How many do you want?",
          validate: validateQuantity
        }
      ]
    ).then(function(response){
      knex.select('stock_quantity', 'price', 'product_sales').from('products').where('id', response.productID).then(function(rows){
        if (rows[0].stock_quantity >= parseInt(response.quantity)){
          var newQuantity = rows[0].stock_quantity - parseInt(response.quantity);
          var totalCost = rows[0].price * parseInt(response.quantity);
          var newProductSales = rows[0].product_sales + totalCost;
          purchase(response.productID, newQuantity, totalCost, newProductSales);
        }
        else{
          console.log("Insufficient quantity!");
          showInventory();
        };
        }).catch(function(error) {
            console.error(error)
          });
    });
  };

function purchase(productID, newQuantity, totalCost, newProductSales){
  knex.table('products').where('id', productID).update({
    stock_quantity: newQuantity,
    product_sales: newProductSales
  }).returning('*').then(function(){
    console.log("Purchase Successful! Total Cost is " + totalCost);
    showInventory();
  }).catch(function(error){
    console.error(error)
  });
};

function validateProductID(productID){
  if(productIDArray.indexOf(parseInt(productID)) >= 0){
    return true;
  }
  else{
    return "Product ID doesn't exist!"
  }
};

function validateQuantity(quantity){
  if (parseInt(quantity) >= 0) {
    return true;
  }
  else{
    return "Please enter valid quantity number!"
  }
};

showInventory();
