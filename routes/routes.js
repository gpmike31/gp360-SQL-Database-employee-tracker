const express = require('express');
const router = express.Router();
const db = require('./db/connection');

// Get all department names
router.get('/department', (req, res) => {
  const sql = `SELECT * FROM deparment`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Create a department
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(body, 'department_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO deparment (department_name)`;
    const params = [body.department_name];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
});

// Get all position names
router.get('/postion', (req, res) => {
    const sql = `SELECT * FROM postion`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// Create a postion
router.post('/position', ({ body }, res) => {
    const errors = inputCheck(body, 'title_position', 'salary');
    if (errors) {
    res.status(400).json({ error: errors });
    return;
    }

    const sql = `INSERT INTO position (title_position, salary)`;
    const params = [body.title_position, body.salary];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
    });
    });
});

// Get all employee names
router.get('/employee', (req, res) => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// create employee profile
router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name');
    if (errors) {
    res.status(400).json({ error: errors });
    return;
    }

    const sql = `INSERT INTO employee (first_name, last_name)`;
    const params = [body.first_name, body.last_name];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
    });
    });
});

module.exports = router;
