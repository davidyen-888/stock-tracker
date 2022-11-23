import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockDetail from "./pages/StockDetail";
import StockOverview from "./pages/StockOverview";

function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverview />} />
          {/* symbol is a dynamic route parameter */}
          <Route path="/detail/:symbol" element={<StockDetail />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
