DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL (10,2) DEFAULT (50000.00),
  department_id INTEGER DEFAULT (1),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
);


INSERT into department (department_name) VALUES ("Sales"), ("Engineer"), ("Finance"), ("Legal");
INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1), ("Sales person", 50000, 1),
("Lead Enginneer", 100000, 2),("Junior Engineer", 900000, 2), ("Accountant", 100000, 3),
("Legal Team Employee", 30000, 4), ("Lawyer", 30000, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, 2),
("Mary Kate", "Olsen", 3, 3),("Ashley", "Olsen", 2, 4),("Michael", "Scott", 5, null), ("Jim", "Halpert", 4, 1),
("Ron", "Swanson", 6, null), ("Leslie", "Knope", 7, 2), ("Phoebe", "Buffet", 3, null),("Rachel", "Green", 1, 3),
("Monica", "Geller", 2, 4),("Ross", "Geller", 5, 1),("Chandler", "Bing", 6, 2), ("Andy", "Dwyer", 7, null);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


-- EMPLOYEE MANAGERS!!!!
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, employee.manager_id, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

-- VIEW EMPLOYEES
SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

-- Employees by Department
SELECT department.id, department.department_name, employee.first_name, employee.last_name, role.title 
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON department.id = role.department_id;

-- View All Roles
SELECT role.title, role.salary, role.department_id, department.department_name FROM role
LEFT JOIN department ON role.department_id = department.id;