# Employee Tracker

## Description

The **Employee Tracker** is a command-line application designed to manage a company's employee database. It allows users to view, add, update, and delete departments, roles, and employees. This project utilizes PostgreSQL (SQL) as the database and leverages the `pg` package for database interaction. The `inquirer` package is used for prompting user input in the command-line interface.

## Table of Contents
- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Technologies

- **Node.js**: JavaScript runtime environment.
- **PostgreSQL**: Relational database for managing data.
- **pg package**: PostgreSQL client for Node.js to interact with the SQL database.
- **inquirer package**: Library to prompt the user and handle CLI interactions.

## Installation

To get started with this project, clone the repository and install the required dependencies:

1. Clone the repository:
    ```bash
    git clone https://github.com/AntonioKOD/employee_tracker.git
    cd employee_tracker
    ```

2. Install Node.js dependencies:
    ```bash
    npm install
    ```

3. Set up the PostgreSQL database:
    - Install PostgreSQL if you haven’t already.
    - Create a database and tables that match the schema of the project. You can refer to the provided SQL schema in the project (if available).


## Usage

Once you've set up your database and installed the dependencies, you can start the application:

1. Run the application:
    ```bash
    node server.js
    ```

2. Follow the prompts in the command-line interface to perform various actions, such as:
    - View all departments, roles, and employees.
    - Add new departments, roles, and employees.
    - Update employee roles and departments.
    - Delete departments, roles, or employees from the database.

## Features

- View all departments, roles, and employees.
- Add new departments, roles, and employees to the database.
- Update employee roles and information.
- Remove departments, roles, and employees from the system.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you would like to help improve this project.

## Questions

If you have any questions or issues, feel free to reach out.