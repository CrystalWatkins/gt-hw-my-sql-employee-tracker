const mysql = require("mysql"); 
const inquirer = require("inquirer");
const chalk = require("chalk");
const boxen = require("boxen");

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
    displaySign();
});

function displaySign() {
    const greeting = chalk.white.bold("EMPLOYEE TRACKER");
    
    const boxenOptions = {
     padding: 1,
     margin: 1,
     borderStyle: "round",
     borderColor: "blue",
     backgroundColor: "#555555",
    };
    const msgBox = boxen( greeting, boxenOptions );
    
    console.log(msgBox);
    init();
};

function init() {
    inquirer
    .prompt([
        {
            type: "list",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View Employees By Manager",
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
            console.log("You have exited the employee tracker!")
            exit();
        }
    });
};

    const viewEmployees = () => {
        var query = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
        connection.query(query, function(err, results) {
            for (var i = 0; i < results.length; i++) {
            }  if(err) throw err;
            console.table(results);

            init();
        })
    };
    const viewDepartment = () => {
        var query = "SELECT department.id, department.department_name, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id";
        connection.query(query, function(err, results) {
            for (var i = 0; i < results.length; i++) {
            }  if(err) throw err;
            console.table(results);
            init();
        })
    };
    const viewManager = () => {
        var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, employee.manager_id, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;";
        connection.query(query, function(err, results) {
            for (var i = 0; i < results.length; i++) {
            }  if(err) throw err;
            console.table(results);
            init();
        })
    };
    const addEmployee = () => {
        connection.query("SELECT * FROM role", (err, data) => {
            if (err) throw err; 
            const arrayOfTitles = data.map((object) => object.name);
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your new Employees first name?",
                    name: "firstName",
                },
                {
                    type: "input",
                    message: "What is your new Employees last name?",
                    name: "lastName",
                },
                {
                    type: "list",
                    message: "Please pick the employee title",
                    choices: arrayOfTitles,
                    name: "title",
                }
            ])
            .then((response) => {
                console.log(response);
                const newEmployeeObject = data.filter(
                    (object) => newEmployeeObject.employeeFirstName === newEmployeeObject.title)
                console.log(newEmployeeObject)
            });
        });
    };

    const removeEmployee = () => {
        connection.query("SELECT * FROM employee", function(err, results){
          if (err) throw err;
        inquirer
          .prompt({
            name: "removeEmployee",
            type: "list",
            message: "Who would you like to remove?",
            choices: function() {var choicesArray = [];
              for (var i = 0; i < results.length; i++) {
                choicesArray.push(results[i].first_name);
              }
              return choicesArray;
            }
          })
          .then(function ({ answer }) {
              const query = "DELETE * FROM employee WHERE employee.first_name = ?"
            connection.query(query, { employee: answer.employee }, function(err, results){
            if (err) throw err
            console.table(results);
            console.log(`You deleted ${employee.first_name}`)
            })
          })
        });
        init();
    };

    const updateRole = () => {
        // select employee
        //another query inside this callback
        // query which you're calling another query
        // go through which roles
        // async await
        // second query inside the callback of the first query
        // 
        console.log("yea")
        init();
    };
    const updateManager = () => {
        console.log("here")
        init();
    };
    const viewRoles = () => {
        var query = "SELECT role.title, role.salary, role.department_id, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id;";
        connection.query(query, function(err, results) {
            for (var i = 0; i < results.length; i++) {
            }  if(err) throw err;
            console.table(results);
            init();
        })
    };

    const exit = () => {
        connection.end();
    };