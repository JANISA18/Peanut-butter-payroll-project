// backend/controllers/employeeController.js
const db = require('../db/connection');

// Get all employees
exports.getAllEmployees = (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  const query = 'SELECT * FROM employees WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(results[0]);
  });
};

// Create new employee
exports.createEmployee = (req, res) => {
  const { fullName, gender, position, salary } = req.body;
  const query = 'INSERT INTO employees (fullName, gender, position, salary) VALUES (?, ?, ?, ?)';
  db.query(query, [fullName, gender, position, salary], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: result.insertId, fullName, gender, position, salary });
  });
};

// Update employee
exports.updateEmployee = (req, res) => {
  const { fullName, gender, position, salary } = req.body;
  const query = 'UPDATE employees SET fullName = ?, gender = ?, position = ?, salary = ? WHERE id = ?';
  db.query(query, [fullName, gender, position, salary, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ id: req.params.id, fullName, gender, position, salary });
  });
};

// Delete employee
exports.deleteEmployee = (req, res) => {
  const query = 'DELETE FROM employees WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Employee deleted' });
  });
};
