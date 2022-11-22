import Search from "../components/Search";
import StockTable from "../components/StockTable";

const StockOverview = () => {
  return (
    <div>
      <h1 className="text-center mt-5">Stock Tracker</h1>
      <Search />
      <StockTable />
    </div>
  );
};

export default StockOverview;
