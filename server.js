const db = require("./db/connection");
const inquirer = require("inquirer");

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "Select One",
        choices: [
          "Add a Department",
          "View Department",
          "Add a Role",
          "View a Role",
          "Add a Employee",
          "View Employees",
          "Update Employee Role",
          "Exit Menu",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.userChoice) {
        case "Add a Department":
          //code to add department
          addDepartment();
          break;
        case "View Department":
          //code to view department
          viewDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "View a Role":
          viewRoles();
          break;
        case "Add a Employee":
            addEmployee();
          break;
        case "View Employees":
          viewEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Exit Menu":
          process.exit(0);
      }
    });
};

//add sql code
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "name",
      },
    ])
    .then((newDepartment) => {
      const sql = "INSERT INTO department SET ?";
      db.promise()
        .query(sql, newDepartment)
        .then((newDepartment) => {
          viewDepartment();
        });
    });
};

const viewDepartment = () => {
  const sql = "SELECT * FROM department";
  db.promise()
    .query(sql)
    .then((returnedDepartment) => {
      console.table(returnedDepartment[0]);
      mainMenu();
    });
};

const addRole = async () => {
  const sql = "SELECT id AS value, name FROM department";
  const departments = await db.promise().query(sql);
  const newRole = await inquirer.prompt([
    {
      type: "input",
      message: "What role would you like to add?",
      name: "title",
    },
    {
      type: "input",
      message: "How much does this role pay?",
      name: "salary",
    },
    {
      type: "list",
      message: "What department does this role belong to?",
      name: "department_id",
      choices: departments[0],
    },
  ]);
  const newRolesql = "INSERT INTO role SET ?";
  await db.promise().query(newRolesql, newRole);
  viewRoles();
};

const viewRoles = async () => {
  const sql =
    "SELECT title, salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id";
  const dbRoles = await db.promise().query(sql);
  console.table(dbRoles[0]);
  mainMenu();
};

const addEmployee = async () => {
  const sqlEmployee =
    "SELECT employee.id AS value, CONCAT(employee.first_name,' ', employee.last_name) AS name FROM employee";
  const sqlRole = "SELECT role.id AS value, role.title AS name from role";
  const dbEmployee = await db.promise().query(sqlEmployee);
  const dbRole = await db.promise().query(sqlRole);
  const newEmployee = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employees first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the employees last name?",
      name: "last_name",
    },
    {
      type: "list",
      message: "What role does this employee have?",
      name: "role_id",
      choices: dbRole[0],
    },
    {
      type: "list",
      message: "Who is this employees manager?",
      name: "manager_id",
      choices: dbEmployee[0],
    },
  ]);
  await db.promise().query("INSERT INTO employee SET ?", newEmployee)
  viewEmployee();
};

const viewEmployee = () => {
  const sql =
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id";
  db.promise()
    .query(sql)
    .then((viewEmployee) => {
      console.table(viewEmployee[0]);
      mainMenu();
    });
};

const updateEmployeeRole = () => {
  const sqlEmployee =
    "SELECT employee.id AS value, CONCAT(employee.first_name,' ', employee.last_name) AS name FROM employee";
  const sqlRole = "SELECT role.id AS value, role.title AS name from role";
  db.promise()
    .query(sqlEmployee)
    .then((employeeList) => {
      return employeeList[0];
    })
    .then((employeeList) => {
      db.promise()
        .query(sqlRole)
        .then((roleList) => {
          return roleList[0];
        })
        .then((roleList) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Choose the Employee",
                choices: employeeList,
              },
              {
                type: "list",
                name: "role",
                message: "Choose the Role",
                choices: roleList,
              },
            ])
            .then((answers) => {
              const sqlUpdateRole =
                "UPDATE employee SET role_id = ? WHERE employee.id = ?";
              db.promise()
                .query(sqlUpdateRole, [answers.role, answers.employee])
                .then(() => {
                  console.log("Employee Role Updated!");
                  mainMenu();
                });
            });
        });
    });
};

mainMenu();