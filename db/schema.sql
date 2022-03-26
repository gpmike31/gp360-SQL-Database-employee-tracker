DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS position;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE position (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title_position VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (department_id) 
  REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name INT NOT NULL,
  position_id INT NOT NULL,
  FOREIGN KEY (position_id)
  REFERENCES position(id)
    ON DELETE CASCADE
);

