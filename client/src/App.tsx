import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockDetail from "./pages/StockDetail";
import StockOverview from "./pages/StockOverview";
import { WatchListContextProvider } from "./context/WatchListContext";

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverview />} />
            {/* symbol is a dynamic route parameter */}
            <Route path="/detail/:symbol" element={<StockDetail />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
