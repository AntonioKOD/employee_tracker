const { Pool } = require('pg');
const inquirer = require('inquirer');
const { addEmployee, addRole, updateEmployee } = require('./queryFunctions');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'Antonio78',
        database: 'employee_db'
    },
    console.log('Connected to the Employees database')
)

pool.connect()


function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'list',
                message: 'What would you like to do',
                choices: [
                    { name: 'View all departments', value: 1 },
                    { name: 'View all roles', value: 2 },
                    { name: 'View all employees', value: 3 },
                    { name: 'Add a department', value: 4 },
                    { name: 'Add a role', value: 5 },
                    { name: 'Add an employee', value: 6 },
                    { name: 'Update an employee role', value: 7 },
                    { name: 'Quit', value: 8 }],

            },
        ])
        .then((results) => {
            if (results.list === 1) {
                pool.query('SELECT * FROM departments', (err, {rows}) => {
                    console.table(rows)
                    menu()
                })
            } else if (results.list === 2) {
                pool.query('SELECT * FROM role', (err, {rows}) => {
                    console.table(rows)
                    menu()
                })
            } else if (results.list === 3) {
                const query = `SELECT e.employee_id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name,' ', m.last_name) AS manager 
                        FROM employee e
                        JOIN role r ON e.role_id = r.role_id
                        JOIN departments d ON r.department_id = d.department_id
                        LEFT JOIN employee m ON e.manager_id = m.employee_id;`
                pool.query(query, (err, { rows }) => {
                    console.table(rows)
                    menu()
                })
            } else if (results.list === 4) {
                inquirer
                    .prompt(
                        [
                            {
                                type: 'input',
                                name: 'departmentName',
                                message: 'What is the name of the new department',
                            }
                        ]
                    )
                    .then((answer) => {
                        pool.query(`INSERT INTO departments (name) VALUES ('${answer.departmentName}')`)
                        console.log(`Added ${answer.departmentName} to departments`)
                        menu()
                    })
            } else if (results.list === 5) {
                 addRole(menu)
                
            }
            else if (results.list === 6) {
                addEmployee(menu)
                
            } else if (results.list === 7) {
                updateEmployee(menu)
                
                
                
            } 
            else if(results.list === 8){
                console.log('Thank you')
                process.exit()
            }
        })




}

menu()