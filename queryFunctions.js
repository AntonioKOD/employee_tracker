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
 
    pool.query('SELECT employee_id, first_name, last_name FROM employee', (err, { rows }) => {
        const employees = rows.map(employee => ({
            name: employee.first_name + ' ' + employee.last_name,
            id: employee.employee_id
        }))

        pool.query('SELECT title, role_id FROM role', (err, { rows }) => {
            const roles = rows.map(role => ({
                title: role.title,
                id: role.role_id
            }))

        inquirer
            .prompt(
                [
                    {
                        type: 'list',
                        name: 'employee',
                        message: "Select an employee",
                       choices: employees.map(employee => ({
                            name: employee.name,
                            value: employee.employee_id  // Store role_id as the value
                        }))
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: 'What will the new employee role be',
                        choices: roles.map(role => ({
                            name: role.title,
                            value: role.id  // Store role_id as the value
                        }))
                    },
                ]
            )
            .then((answer) => {
                pool.query(`UPDATE employee
                    SET role_id = $1
                    WHERE employee.employee_id = $2`, [answer.newRole, answer.employee])
                console.log(`Updated Employee`)
                displayAgain()


            })
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
    pool.query('SELECT role_id, title FROM role', (err, { rows }) => {
        const roles = rows.map(role => ({
            name: role.title,
            value: role.role_id
        }))

        pool.query('SELECT employee_id,first_name, last_name FROM employee', (err, { rows }) => {
            const managers = rows.map(manager => ({
                name: manager.first_name + ' ' + manager.last_name,
                value: manager.employee_id
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
                            choices: roles
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the manager of this employee',
                            choices: managers
                        }
                    ]
                )
                .then((answer) => {
                    console.log(answer)
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

