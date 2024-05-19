const express = require('express');
const fs = require('fs');
const router = express.Router();
const dataFilePath = './data/data.json';

// Helper functions
const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Add data
router.post('/add', (req, res) => {
  const data = readData();
  data.entries.push(req.body);
  data.count.add += 1;
  writeData(data);
  res.status(201).send('Data added successfully');
});

// Update data
router.put('/update/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.entries.findIndex(entry => entry.id === id);

  if (index === -1) {
    return res.status(404).send('Data not found');
  }

  data.entries[index] = req.body;
  data.count.update += 1;
  writeData(data);
  res.send('Data updated successfully');
});

// Get count of add and update operations
router.get('/count', (req, res) => {
  const data = readData();
  res.send(data.count);
});

module.exports = router;