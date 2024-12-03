// src/SalesChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sales')
      .then((response) => {
        setSalesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
        setLoading(false);
      });
  }, []);

  // Preparar los datos para el gráfico
  const chartData = {
    labels: salesData.map((sale) => sale.product),  // Productos como etiquetas
    datasets: [
      {
        label: 'Total de Ventas',
        data: salesData.map((sale) => sale.totalSales),  // Total de ventas para cada producto
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Ventas Totales por Producto',
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2>Gráfico de Ventas</h2>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default SalesChart;
