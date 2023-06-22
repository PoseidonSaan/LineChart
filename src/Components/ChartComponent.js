import React from "react";
import LineChartDaily from "./LineChartDaily";
import LineCharWeekly from "./LineCharWeekly";
import LineChartMonthly from "./LineChartMonthly";
import LineChartYearly from "./LineChartYearly";

import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const ChartComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("daily");
  const options = ["daily", "weekly", "monthly", "yearly"];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const renderLineChart = () => {
    switch (selectedOption) {
      case "daily":
        return <LineChartDaily />;
      case "weekly":
        return <LineCharWeekly />;
      case "monthly":
        return <LineChartMonthly />;
      case "yearly":
        return <LineChartYearly />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Alerts */}
      <div className="bg-slate-300 h-full w-screen px-10 py-10">
        {/* title and selection */}
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2 capitalize">
            <h1>Alerts</h1>
            <h2> {selectedOption} performance</h2>
          </div>
          <div>
            {" "}
            <div className="relative inline-block">
              <button
                className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm"
                onClick={handleToggle}
              >
                This <span className="font-bold">{selectedOption}</span>
                {isOpen ? (
                  <BiChevronUp className="inline-block ml-1" />
                ) : (
                  <BiChevronDown className="inline-block ml-1" />
                )}
              </button>
              {isOpen && (
                <div className="absolute mt-2 py-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  {options.map((option) => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        selectedOption === option
                          ? "bg-purple-500 text-white"
                          : ""
                      }`}
                      onClick={() => handleOptionChange(option)}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* chart */}
        <div className="bg-gray-300">{renderLineChart()}</div>
      </div>
    </div>
  );
};

export default ChartComponent;
