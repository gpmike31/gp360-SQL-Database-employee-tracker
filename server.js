const db = require("./db/connection");
const inquirer = require("inquirer");

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuOptions",
        message: "Select Appropiate Objective To Start Building Your Database",
        choices: [
            "Add Department",
            "View Department",
            "Add Role",
            "View Role",
            "Add Employee",
            "View Employee Roster",
            "Update Employee Role",
            "Exit and return to previous Menu or Finish Database Updates",
        ],
      },
    ])
    //node functions to carry out different user roles to modify database
    .then((answer) => {
    switch (answer.userChoice) {
        case "Add Department":
        addDepartment();
        break;
        case "View Department":
        viewDepartment();
        break;
        case "Add Role":
        addRole();
        break;
        case "View Role":
        viewRoles();
        break;
        case "Add Employee":
            addEmployee();
        break;
        case "View Employee Roster":
        viewEmployee();
        break;
        case "Update Employee Role":
        updateEmployeeRole();
        break;
        case "Exit and return to previous Menu or Finish Database Updates":
        process.exit(0);
      }
    });
};

//inquirer and sql code additions to insert additional department information into new and appropiate datbase
const addDepartment = () => {
    inquirer
        .prompt([
        {
            type: "input",
            message: "Pleasy type or select the name of the department you would like to add to your roster.",
            name: "name",
        },
        ])
        .then((newDepartment) => {
        const sql = "INSERT INTO department SET";
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
        .then((returnDepartment) => {
        console.table(returnDepartment[0]);
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
    const viewEmployee = await connection.query('SELECT * FROM employee');
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

const updateEmployeeRole = async () => {
    // get employees and choices to select from to update proper database
    const employees = await connection.query('SELECT * FROM employee');
    console.log({ employees });
    const employee = await inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role would you like to update?",
            name: 'selectedValue',
            choices: employees.map(
                employee =>
                `${employee.first_name} ${employee.last_name} ${employee.role_id} ${employee.manager_id}`,
            ),
        },
    ]);
    console.log({ employee });
    const employeeId = employee.selectedValue.split(' ')[0];

    // get roles and choose one role to update
    const roles = await connection.query('SELECT * FROM role');
    console.log({ roles });
    const newRole = inquirer.prompt([
        {
            type: 'list',
            message: "What is the employee's new role?",
            name: 'selectedValue',
            choices: roles.map(role => `${role.department_id} ${role.title} ${role.salary}`),
        },
    ]);
    console.log({ newRole });
    const roleId = newRole.selectedValue.split(' ')[0];

    // update employee role
    const updateResult = await connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [roleId, employeeId],
    );
    console.log({ updateResult });

    return Promise.resolve();
};

updateEmployeeRole()
    .then(() => {
        console.log('updateEmployeeRole() is Done. Now will run start()');
        start();
    })
    .catch(err => {
        console.error('Something Error ', { err });
    });
