import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnhub from "../api/finnhub";

const StockDetail = () => {
  const { symbol } = useParams();

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
              resolution: 30,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneWeek,
              to: currTime,
              resolution: 60,
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
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <div>
      <h1>Stock Detail</h1>
      <h2>{symbol}</h2>
    </div>
  );
};

export default StockDetail;
