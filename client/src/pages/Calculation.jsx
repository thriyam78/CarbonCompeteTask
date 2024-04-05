import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import Container from '../components/Container';

const CalculationPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const { Co2 } = useParams();
  const chartRef = useRef(null);

  const calculateCO2Release = () => {
    const approximateCO2Release = parseFloat(Co2);
    const calculatedResult = inputValue * approximateCO2Release;
    return calculatedResult.toFixed(2);
  };

  useEffect(() => {
    if (result !== null) {
      const ctx = document.getElementById('myChart');
      if (chartRef.current !== null) {
        chartRef.current.destroy(); // Destroy previous chart instance
      }
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
          datasets: [{
            label: 'CO2 Release per Year',
            data: result,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [result]);

  const handleViewGraph = () => {
    const years = [1, 2, 3, 4, 5];
    const approximateCO2Release = parseFloat(Co2);
    const calculatedResult = years.map(year => (inputValue * approximateCO2Release * year).toFixed(2));
    setResult(calculatedResult);
  };

  return (
    <Container>
      <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4 text-red-300">Warning: Please note that this calculation is based on approximate Values</h2>
        <h2 className="text-2xl font-bold mb-4">Calculate CO2 Release</h2>
        <div className="mb-4">
          <label htmlFor="inputValue" className="block mb-2">Input Value:</label>
          <input
            type="number"
            id="inputValue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Result:</h3>
          <p className="text-xl">{calculateCO2Release()} kg CO2</p>
        </div>
        <button onClick={handleViewGraph} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          View Graph
        </button>
        <div className="mt-8">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </Container>
  );
};

export default CalculationPage;
