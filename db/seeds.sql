INSERT INTO department
  (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Salesperson', 30000, 1),
  ('Sales Manager', 40000, 1),
  ('Enginneer', 60000, 2),
  ('Junior Enginner', 20000, 2),
  ('Finance Manager', 70000, 3),
  ('Underwriter', 50000, 3),
  ('Lawyer', 90000, 4),
  ('Legal Assistant', 60000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 2, NULL ),
  ('Jack', 'London', 1, 1),
  ('Robert', 'Bruce', 3, NULL),
  ('Peter', 'Greenaway', 4, 3),
  ('Derek', 'Jarman', 5, NULL),
  ('Tyrone', 'Foster', 6, 5),
  ('Gerald', 'Pegg', 7, NULL),
  ('Tracie', 'Spencer', 8, 7);

