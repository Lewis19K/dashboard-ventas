// src/routes/apiRoutes.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();

// Ruta para obtener los datos del CSV
router.get('/data', (req, res) => {
  const results = [];
  fs.createReadStream('./data/sales_data.csv') // Ruta del archivo CSV
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (error) => {
      res.status(500).json({ message: 'Error al leer el archivo CSV', error });
    });
});

module.exports = router;
