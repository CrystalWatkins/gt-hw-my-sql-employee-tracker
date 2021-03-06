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
  if (err) throw err;
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
  const msgBox = boxen(greeting, boxenOptions);

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
          "View All Roles",
          "Add Department",
          "Add Role",
          "exit",
        ],
        name: "action",
        message: "What Would You Like To Do?",
      }
    ]).then(({ action }) => {
      if (action === "View All Employees") {
        viewEmployees();
      } else if (action === "View All Employees By Department") {
        viewDepartment();
      } else if (action === "View Employees By Manager") {
        viewManager();
      } else if (action === "Add Employee") {
        addEmployee();
      } else if (action === "Remove Employee") {
        removeEmployee();
      } else if (action === "Update Employee Role") {
        updateRole();
      } else if (action === "View All Roles") {
        viewRoles();
      } else if (action === "Add Department") {
        addDepartment();
      } else if (action === "Add Role") {
        addRole();
      } else {
        console.log("You have exited the employee tracker!")
        exit();
      }
    });
};

const viewEmployees = () => {
  var query = `SELECT employee.first_name, employee.last_name, role.title,
        department.department_name, role.salary, manager.first_name AS manager_first,
        manager.last_name AS manager_last FROM employee LEFT JOIN role ON employee.role_id 
        = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee
        manager ON manager.id = employee.manager_id;`
  connection.query(query, function (err, results) {
    for (var i = 0; i < results.length; i++) {
    } if (err) throw err;
    console.table(results);
    init();
  })
};

const viewDepartment = () => {
  var query = `SELECT department.id, department.department_name, employee.first_name, 
        employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = 
        role.id LEFT JOIN department ON department.id = role.department_id`;
  connection.query(query, function (err, results) {
    for (var i = 0; i < results.length; i++) {
    } if (err) throw err;
    console.table(results);
    init();
  })
};

const viewManager = () => {
  var query = `SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, department.department_name, employee.manager_id, manager.first_name 
        AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN role 
        ON employee.role_id = role.id LEFT JOIN department ON role.department_id = 
        department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`
  connection.query(query, function (err, results) {
    for (var i = 0; i < results.length; i++) {
    } if (err) throw err;
    console.table(results);
    init();
  })
}

const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    // console.log(data);
    const arrayOfTitles = data.map((object) => {
      return { name: object.title, value: object.id };
    });
    connection.query("SELECT * FROM employee", (err, data) => {
      if (err) throw err;
      // console.log(data);
      const arrayOfManagers = data.map((managers) => {
        return { name: managers.first_name, value: managers.id };
      });
      // console.log(arrayOfTitles);
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is your new employee's first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is your new employee's last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "Please select the employee's job role:",
            choices: arrayOfTitles,
            name: "role_id",
          },
          {
            type: "list",
            message: "Please select the employee's manager:",
            choices: arrayOfManagers,
            name: "manager_id",
          },
        ])
        .then((response) => {
          // console.log(response);
          connection.query("INSERT INTO employee SET ?", response, (err, res) => {
            if (err) throw err;
            connection.query("SELECT * FROM employee", (err, res) => {
              if (err) throw err;
              console.table(res);
              init();
            });
          });
        });
    });
  });
};

const removeEmployee = () => {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "id",
        type: "list",
        message: "Who would you like to remove?",
        choices: function () {
          var choicesArray = [];
          for (var i = 0; i < results.length; i++) {
            const Obj = {
              name: `${results[i].first_name} ${results[i].last_name}`,
              value: results[i].id,
            }
            choicesArray.push(Obj);
          }
          return choicesArray;
        }
      })
      .then(function ({ id }) {
        const query = "DELETE FROM employee WHERE id = ?"
        connection.query(query, id, function (err, results) {
          if (err) throw err;
          connection.query("SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            console.log("Your delete was successful");
            console.table(res);
            init();
          })
        })
      });
  });
};


const updateRole = () => {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    connection.query("SELECT * FROM employee", (err, response) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "list",
            message: "Please select the employee's job role:",
            // choices: arrayOfTitles,
            name: "role_id",
            choices: function () {
              var titleArray = [];
              for (var i = 0; i < data.length; i++) {
                const Object = {
                  name: `${data[i].title}`,
                  value: data[i].id,
                }
                titleArray.push(Object)
              }
              return titleArray;
            }
          },
          {
            type: "list",
            name: "id",
            message: "Please select the employee you would like to update?",
            choices: function () {
              var employeeArray = [];
              for (var i = 0; i < response.length; i++) {
                const Obj = {
                  name: `${response[i].first_name} ${response[i].last_name}`,
                  value: response[i].id,
                }
                employeeArray.push(Obj);
              }
              return employeeArray;
            }
          },
        ])
        .then((response) => {
          console.log(response);
          connection.query("UPDATE employee SET ? WHERE ?;",
            [
              {
                role_id: response.role_id
              },
              {
                id: response.id
              }
            ],
            (err) => {
              if (err) throw err;
              connection.query(`SELECT employee.first_name, employee.last_name, role.title From 
                employee LEFT Join role ON employee.role_id = role.id;`, (err, res) => {
                if (err) throw err;
                console.table(res);
                init();
              });
            })
        })
    });
  });
};



const viewRoles = () => {
  var query = `SELECT role.title, role.salary, role.department_id, 
        department.department_name FROM role LEFT JOIN department ON role.department_id = department.id`
  connection.query(query, function (err, results) {
    for (var i = 0; i < results.length; i++) {
    } if (err) throw err;
    console.table(results);
    init();
  })
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your new department's name",
        name: "department_name",
      },
    ])
    .then((response) => {
      console.log(response);
      connection.query("INSERT INTO department SET ?", response, (err) => {
        if (err) throw err;
        connection.query("SELECT * FROM department", (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        });
      });
    })

};

const addRole = () => {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    const departmentArray = results.map((data) => data.department_id);
    inquirer
      .prompt([
        {
          type: "input",
          message: "What Role Do you want to Add to the Company?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary of this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which Department is this role in?",
          name: "department_id",
          choices: departmentArray,
        },
      ])
      .then((results) => {
        console.log(results);
        connection.query("INSERT INTO role SET ?", results, (err) => {
          if (err) throw err;
          connection.query("SELECT * FROM role", (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
          });
        });
      });
  });
};

const exit = () => {
  connection.end();
};