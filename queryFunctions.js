const { Pool } = require('pg');
const inquirer = require('inquirer');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'Antonio78',
        database: 'employee_db'
    },
    console.log('Connected to the Employees database')
)

pool.connect()

function updateEmployee(displayAgain) {

    pool.query('SELECT first_name, last_name FROM employee', (err, { rows }) => {
        const employees = rows.map(employee => ({
            name: employee.first_name + ' ' + employee.last_name
        }))


        inquirer
            .prompt(
                [
                    {
                        type: 'list',
                        name: 'employee',
                        message: "Select an employee",
                        choices: employees.map(employee => employee.name)
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'What will the new employee role be',
                    },
                ]
            )
            .then((answer) => {
                pool.query(`UPDATE employee
                    SET role = ${answer.newRole}
                    WHERE employee.employee_id = ${answer.employee}`)
                console.log(`Updated Employee`)
                displayAgain()


            })

    })
}

function addRole(displayAgain) {
    pool.query('SELECT department_id, name FROM departments', (err, { rows }) => {
        const departments = rows.map(department => ({
            name: department.name,
            value: department.department_id
        }))
        inquirer
            .prompt(
                [
                    {
                        type: 'input',
                        name: 'roleName',
                        message: 'What is the name of the new role',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for this role'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'What department does this role belong to?',
                        choices: departments
                    }
                ]
            )
            .then((answer) => {
                pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.roleName}', ${answer.salary}, ${answer.department})`)
                displayAgain()
            })

    })





}


function addEmployee(displayAgain) {
    pool.query('SELECT title FROM role', (err, { rows }) => {
        const roles = rows.map(role => ({
            title: role.title
        }))

        pool.query('SELECT first_name, last_name FROM employee', (err, { rows }) => {
            const managers = rows.map(manager => ({
                name: manager.first_name + ' ' + manager.last_name
            }))
            managers.push({
                name: 'None',
                value: null,
            })

            inquirer
                .prompt(
                    [
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the first name of the new employee',
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the last name of the new employee',
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the role of the new employee',
                            choices: roles.map(role => role.title)
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the manager of this employee',
                            choices: managers.map(manager => manager.name),
                        }
                    ]
                )
                .then((answer) => {
                    pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role}, ${answer.manager} )`)
                    console.log(`Added ${answer.firstName} to employees`)
                    displayAgain()


                })

        })

    })
}





module.exports = {
    addEmployee,
    addRole,
    updateEmployee,
}

