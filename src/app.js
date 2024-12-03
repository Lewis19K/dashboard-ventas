// src/app.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const port = 5000;

app.use(cors()); // Permitir solicitudes desde otros dominios
app.use(express.json()); // Permitir JSON en las peticiones

// Ruta para obtener los datos de ventas desde el CSV
app.get('/api/sales', (req, res) => {
  const results = [];

  // Lee el archivo CSV
  fs.createReadStream(path.join(__dirname, '../data/sales_data.csv'))
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);  // Verifica qué datos estamos leyendo

      // Calculamos el total de ventas: Cantidad * Precio
      const totalVentas = parseInt(row.Cantidad) * parseFloat(row.Precio);

      // Asegúrate de que los campos coincidan con lo que tienes en tu CSV
      results.push({
        date: row.Fecha,  // Asegúrate de que el nombre de la columna sea correcto
        product: row.Producto,
        category: row['Categoría'],
        region: row.Región,
        quantity: parseInt(row.Cantidad),
        price: parseFloat(row.Precio),
        totalSales: totalVentas // Total de ventas calculado
      });
    })
    .on('end', () => {
      console.log('Datos procesados:', results); // Verifica los resultados antes de enviar la respuesta
      res.json(results); // Devuelve los datos en formato JSON
    })
    .on('error', (err) => {
      console.error('Error al leer el archivo CSV', err);
      res.status(500).send('Error al leer el archivo CSV');
    });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
