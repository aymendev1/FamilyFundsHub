"use client";
import React from "react";
import { Chart } from "react-google-charts";
function SavingsCategories() {
  const data = [
    ["SavingCategory", "AmountInUSD"],
    ["Vacations", 1000],
    ["Furnitures", 700],
    ["Mortage", 500],
    ["Electronics", 100], // Below limit.
    ["Anchovies", 50], // Below limit.
  ];
  const options = {
    sliceVisibilityThreshold: 0.2, // 20%
    fontSize: 10,
    fontName: "Noto Sans",
  };
  return (
    <div className="w-full rounded-lg bg-white flex flex-col p-4">
      <span className="text-xl  font-black  text-blue-950">
        Savings Categories
      </span>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}

export default SavingsCategories;
