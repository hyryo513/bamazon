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

function showInventory(){
  knex.select('*').from('departments').then(function(rows){
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
    choices: ["View Product Sales by Department", "Create New Department", "Exit"]
    }]
    ).then(function(response){
        switch(response.option){
            case "View Product Sales by Department":
                viewProductSales();
                break;
            case "Create New Department":
                createDepartment();
                break;
            case "Exit":
                knex.destroy();
                break;
        };
    });
};

function createDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Please type the name for the new department"
        },
        {
            type: "input",
            name: "overHeadCosts",
            message: "Please enter the over head costs for the new department"
        }
        ]).then(function(response){
            knex('departments').insert(
                {
                    department_name: response.departmentName,
                    over_head_costs: response.overHeadCosts
                }
            ).then(function(){
                console.log("New department is added!");
                showInventory();
            }).catch(function(error) {
                console.error(error)
            });
    });
};

function viewProductSales(){
    knex.select('departments.department_id', 'departments.department_name', 'departments.over_head_costs', knex.sum('products.product_sales').as('total_sales'), knex.raw('SUM(products.product_sales) - departments.over_head_costs AS total_profit')).from('departments').leftJoin('products', 'departments.department_name', 'products.department_name').groupBy('departments.department_id').then(function(rows){
        var table = cTable.getTable(rows);
        console.log(table);
        mainFunction();   
        }).catch(function(error) {
        console.error(error)
        });
};

showInventory();
