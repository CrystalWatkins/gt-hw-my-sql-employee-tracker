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
  salary DECIMAL (10,2),
  department_id INTEGER,
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


INSERT into department (department_name) VALUES ("Sales");
INSERT into department (department_name) VALUES ("Engineer");
INSERT into department (department_name) VALUES ("Finance");
INSERT into department (department_name) VALUES ("Legal");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("Lead Enginneer", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Junior Engineer", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Accountant", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Legal Team Employee", 30000, 4);
INSERT into role (title, salary, department_id) VALUES ("Lawyer", 30000, 4);


INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mary Kate", "Olsen", 1, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ashley", "Olsen", 2, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", 3, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ron", "Swanson", 2, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Leslie", "Knope", 4, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Phoebe", "Buffet", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Rachel", "Green", 1, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Monica", "Geller", 2, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ross", "Geller", 3, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Chandler", "Bing", 4, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Dwyer", 4, null);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- SELECT department.id, department.department_name, role.id, role.title, role.salary, role.department_id, employee.first_name, employee.last_name, employee.role_id, employee_manager.id
-- FROM department
-- RIGHT JOIN department ON (department.department_name = role.id AND on role.department_id = employee.first_name
-- ORDER BY department.id;

-- TO GET MANAGER NAME! let query = "SELECT * FROM employee WHERE manager_id IS NULL";