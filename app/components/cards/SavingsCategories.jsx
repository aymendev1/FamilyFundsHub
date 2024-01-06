"use client";
import React from "react";
import { Chart } from "react-google-charts";
function SavingsCategories() {
  const data = [
    ["SavingCategory", "AmountInUSD"],
    ["Vacations", 1000],
    ["Furnitures", 700],
    ["Mortage", 800],
    ["Electronics", 302],
    ["Anchovies", 500],
  ];
  const colors = [
    "#6366f1",
    "#60a5fa",
    "#0369a1",
    "#fb7185",
    "#14b8a6",
    "#047857",
    "#65a30d",
    "#facc15",
    "#6d28d9",
    "#c084fc",
    "#f472b6",
    "#f59e0b",
    "#e879f9",
    "#f97316",
    "#ef4444",
  ];
  const options = {
    fontSize: 15,
    fontName: "Noto Sans",
    chartArea: { left: 20, top: 20, width: "100%", height: "50%" },
    colors: colors,
    legend: {
      display: "none",
      position: "bottom",

      textStyle: { color: "black", fontSize: 16 },
    },
    sliceVisibilityThreshold: 0.1,
    pieSliceTextStyle: {
      color: "white",
      fontSize: "13",
      top: 10,
      left: 50,
      position: "start",
    },
  };

  return (
    <div className="w-[40%] rounded-lg bg-white flex flex-col p-4">
      <span className="text-xl  font-black  text-blue-950">Savings Goals</span>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"100%"}
        legendToggle
      />
    </div>
  );
}

export default SavingsCategories;
