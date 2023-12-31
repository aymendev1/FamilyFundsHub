"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function overviewChartDashboard(props) {
  const { data } = props;
  const ChartProps = {
    labels: data?.Months,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Spent this month",
        data: data?.stats,
        // you can set indiviual colors for each bar
        backgroundColor: ["#17255480"],
        borderWidth: 1,
        hoverBackgroundColor: ["#172554"],
        borderRadius: 10,
        minBarLength: 2,
        barPercentage: 1,
        barThickness: 40,
      },
    ],
  };
  return (
    <Bar
      data={ChartProps}
      height={200}
      options={{
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
          },
          layout: { autoPadding: false },
          legend: {
            display: false,
          },
        },
        scales: {
          x: { border: { display: false }, grid: { display: false } },
        },
      }}
    />
  );
}

export default overviewChartDashboard;
