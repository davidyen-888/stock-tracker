import { useEffect, useState } from "react";
import finnhub from "../api/finnhub";

interface Result {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const renderDropdown = () => {
    const dropdDownClass = search ? "dropdown-menu show" : "dropdown-menu";
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={dropdDownClass}
      >
        {results.map((result: Result) => {
          return (
            <li key={result.symbol} className="dropdown-item">
              {result.description}({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnhub.get("/search", {
          params: {
            q: search,
          },
        });
        // console.log(response);
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {
        console.error(err);
      }
    };
    // only call fetchData if search is not empty
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};

export default Search;
