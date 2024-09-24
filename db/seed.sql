
INSERT INTO departments (name) VALUES
('Engineering'),
('Sales'),
('Human Resources');


INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),  
('Engineering Manager', 120000, 1),  
('Salesperson', 60000, 2),  
('Sales Manager', 100000, 2),  
('HR Specialist', 50000, 3),  
('HR Manager', 90000, 3);  


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),  
('Jane', 'Smith', 2, 1),  
('Alice', 'Johnson', 3, 2),  
('Bob', 'Williams', 4, 2),  
('Eve', 'Davis', 5, 3),  
('Charlie', 'Brown', 6, 4);  



