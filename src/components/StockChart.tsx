import { useState } from "react";
import Chart from "react-apexcharts";

interface ChartData {
  day: string;
  week: string;
  year: string;
}

const StockChart = ({
  chartData,
  symbol,
}: {
  chartData: ChartData;
  symbol: any;
}) => {
  const [dateFormat, setDateFormat] = useState("24h");
  // Destructure from the chartData
  const { day, week, year } = chartData;

  // function for the buttons to change time format
  const determineTimeFormat: any = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const determineColor = () => {
    if (determineTimeFormat()) {
      if (
        determineTimeFormat()[determineTimeFormat().length - 1].y >
        determineTimeFormat()[0].y
      ) {
        return "#26C281";
      } else {
        return "#ED3419";
      }
    }
  };

  const options: Object = {
    colors: [determineColor()],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animation: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const renderButtonSelect = (button: string) => {
    const classes = "btn m-1 ";
    // if the button is selected
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={renderButtonSelect("24h")}
          onClick={() => setDateFormat("24h")}
        >
          Day
        </button>
        <button
          className={renderButtonSelect("7d")}
          onClick={() => setDateFormat("7d")}
        >
          Week
        </button>
        <button
          className={renderButtonSelect("1y")}
          onClick={() => setDateFormat("1y")}
        >
          Year
        </button>
      </div>
    </div>
  );
};

export default StockChart;
