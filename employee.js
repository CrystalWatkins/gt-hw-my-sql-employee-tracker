const mysql = require("mysql"); 
const inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "watkins0428",
  database: "employee_DB"
});

connection.connect(function (err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
});



function init() {
    inquirer
    .prompt([
        {
            type: "list",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "exit",
            ],
            name: "action",
            message: "What Would You Like To Do?",
        }
    ]).then(({action}) =>{
        if(action === "View All Employees") {
            viewEmployees();
        } else if (action === "View All Employees By Department") {
            viewDepartment ();
        } else if (action === "View Employees By Manager") {
            viewManager ();
        } else if (action === "Add Employee") {
            addEmployee ();
        } else if (action === "Remove Employee") {
            removeEmployee ();
        } else if (action === "Update Employee Role") {
            updateRole ();
        }else if (action === "Update Employee Manager") {
            updateManager();
        } else if (action === "View All Roles") {
            viewRoles ();
        } else {
            exit();
        }
    });
};


    // viewEmployees();
    // viewDepartment ();
    // viewManager ();
    // addEmployee ();
    // removeEmployee ();
    // updateRole ();
    // updateManager();
    // viewRoles ();
    // exit();