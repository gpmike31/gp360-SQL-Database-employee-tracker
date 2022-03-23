DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS position;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  ID INIT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE position (
  ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  employee_position VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  REFERENCES department(ID)
    ON DELETE SET NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
 
);