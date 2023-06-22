import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import riskData from "../RiskData.json";

const LineChartYearly = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartOptions = {
      scales: {
        x: {
          type: "linear",
          min: 0,
          max: 1.5,
          title: {
            display: true,
            text: "Risk Value",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Risk Count",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const existingData = [
      { x: 0, y: 0 },
      { x: riskData.yearly.riskValue, y: riskData.yearly.riskCount },
    ];

    const extendedData = [...existingData, { x: 1.5, y: 0 }];

    const chartData = {
      datasets: [
        {
          data: extendedData,
          backgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          tension: 0.4,
          fill: false,
        },
      ],
    };

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      // Destroy existing chart instance
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      // Clean up by destroying the chart instance on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChartYearly;
