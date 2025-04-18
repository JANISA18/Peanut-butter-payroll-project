// Get all employees
const express = require('express');         // Load express first
const cors = require('cors');               // Then any other middleware
const db = require('./db');                 // DB connection
require('dotenv').config();                 // Load environment variables

const app = express();                      
const PORT = process.env.PORT || 5000;      // Define the port

db.query('SELECT 1')
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('MySQL connection failed:', err));

app.use(cors());
app.use(express.json());

app.get('/employees', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM employees');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Add a new employee
  app.post('/employees', async (req, res) => {
    const {
      employeeNumber,
      firstName,
      lastName,
      salutation,
      gender,
      fullName,
      grossSalary,
      profileColor,
    } = req.body;
  
    try {
      await db.query(
        `INSERT INTO employees (employeeNumber, firstName, lastName, salutation, gender, fullName, grossSalary, profileColor)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          employeeNumber,
          firstName,
          lastName,
          salutation,
          gender,
          fullName,
          grossSalary,      
          profileColor      
        ]
      );
      res.status(201).json({ message: 'Employee added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  //   const { id } = req.params;
  //   const updatedEmployee = req.body;
    
  //   console.log(updatedEmployee); 
  //   try {
  //     const profileColor = updatedEmployee.profileColor;
  //     const grossSalary = updatedEmployee.grossSalary;
  //     const restOfEmployee = {
  //       salutation: updatedEmployee.salutation,
  //       firstName: updatedEmployee.firstName,
  //       lastName: updatedEmployee.lastName,
  //       fullName: updatedEmployee.fullName,
  //       employeeNumber: updatedEmployee.employeeNumber
  //     };
  //     // Check if profileColor is valid before proceeding
  //     if (profileColor && Array.isArray(profileColor)) {
  //       const result = await db.query(
  //         `UPDATE employees SET 
  //           salutation = ?, 
  //           firstName = ?, 
  //           lastName = ?, 
  //           fullName = ?, 
  //           employeeNumber = ?, 
  //           grossSalary = ?, 
  //           profileColor = ?
  //         WHERE id = ?`,
  //         [
  //           restOfEmployee.salutation,
  //           restOfEmployee.firstName,
  //           restOfEmployee.lastName,
  //           restOfEmployee.fullName,
  //           restOfEmployee.employeeNumber,
  //           grossSalary,  
  //           profileColor,
  //           id
  //         ]
  //       );
        
  
  //       res.status(200).json({ message: 'Employee updated successfully' });
  //     } else {
  //       res.status(400).json({ message: 'Invalid profile colors format' });
  //     }
  //   } catch (error) {
  //     console.error('Error updating employee:', error);
  //     res.status(500).json({ message: 'Failed to update employee' });
  //   }
  // });
  
  // console.log(updatedEmployee);

  // Start the server
  
  app.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
  
    const {
      salutation,
      firstName,
      lastName,
      fullName,
      employeeNumber,
      grossSalary,
      profileColor,
    } = updatedEmployee;
  
    try {
      const result = await db.query(
        `UPDATE employees SET 
          salutation = ?, 
          firstName = ?, 
          lastName = ?, 
          fullName = ?, 
          employeeNumber = ?, 
          grossSalary = ?, 
          profileColor = ?
        WHERE id = ?`,
        [
          salutation,
          firstName,
          lastName,
          fullName,
          employeeNumber,
          grossSalary,
          profileColor, 
          id,
        ]
      );
  
      res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Failed to update employee' });
    }
  });
  

  app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

// DELETE employee by ID
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM employees WHERE id = ?', [parseInt(id, 10)]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});
