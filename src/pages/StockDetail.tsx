import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnhub from "../api/finnhub";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

interface data {
  c: number[];
  t: number[];
}

const formatData = (data: data) => {
  return data.t.map((time: number, idx: number) => {
    return {
      x: time * 1000,
      // truncate to 2 decimal places
      y: Math.floor(data.c[idx] * 100) / 100,
    };
  });
};

const StockDetail = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      // handling unix timestamp
      const date = new Date();
      const currTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 6) {
        // Saturday
        oneDay = currTime - 24 * 60 * 60 * 2;
      } else if (date.getDay() === 0) {
        // Sunday
        oneDay = currTime - 24 * 60 * 60 * 3;
      } else {
        // Weekday
        oneDay = currTime - 24 * 60 * 60;
      }
      const oneWeek = currTime - 24 * 60 * 60 * 7;
      const oneYear = currTime - 24 * 60 * 60 * 365;

      // We'll use Promise.all instead to prevent getting request in sequence
      try {
        const responses = await Promise.all([
          finnhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneDay,
              to: currTime,
              resolution: 1,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneWeek,
              to: currTime,
              resolution: 15,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneYear,
              to: currTime,
              resolution: "D",
            },
          }),
        ]);
        console.log(responses);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <div>
      {chartData && <StockChart chartData={chartData} symbol={symbol} />}
      <StockData symbol={symbol} />
    </div>
  );
};

export default StockDetail;
