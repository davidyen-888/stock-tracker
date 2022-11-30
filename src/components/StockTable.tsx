import { useContext, useEffect, useState } from "react";
import finnhub from "../api/finnhub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../context/WatchListContext";
import { useNavigate } from "react-router-dom";

interface StockData {
  symbol: string;
  data: {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
  };
}

const StockTable = () => {
  const [stock, setStock] = useState<StockData[]>([]);
  // const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AAPL"]);
  const { watchList, deleteStock } = useContext(WatchListContext);
  // for url navigation
  const navigate = useNavigate();

  // Determine the value of stock is positive or negative -> change color
  const determineColor = (change: number) => {
    return change > 0 ? "text-success" : "text-danger";
  };

  const renderIcon = (change: number) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  const handleStockSelect = (symbol: string) => {
    navigate(`detail/${symbol}`);
  };

  useEffect(() => {
    // after we send the response out, the component will get unmounted, we don't want to call setStock if the component get unmounted
    let isMounted = true;
    const fetchData = async () => {
      // We'll use Promise.all instead to prevent getting request in sequence
      try {
        const responses = await Promise.all(
          watchList.map((stock: string) => {
            return finnhub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        console.log(responses);
        const responseData: any = responses.map((response: any) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(responseData);
        if (isMounted) {
          setStock(responseData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [watchList]);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79, 89, 102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Change</th>
            <th scope="col">Change%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData: StockData) => {
            return (
              <tr
                onClick={() => handleStockSelect(stockData.symbol)}
                style={{ cursor: "pointer" }}
                className="table-row"
                key={stockData.symbol}
              >
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={determineColor(stockData.data.d)}>
                  {stockData.data.d}
                  {renderIcon(stockData.data.d)}
                </td>
                <td className={determineColor(stockData.data.dp)}>
                  {stockData.data.dp}
                  {renderIcon(stockData.data.d)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
