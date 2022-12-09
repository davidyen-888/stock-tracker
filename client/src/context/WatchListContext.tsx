import { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext({
  watchList: [] as string[],
  deleteStock: (stock: string) => {},
  addStock: (stock: string) => {},
});

export const WatchListContextProvider = (props: any) => {
  const [watchList, setWatchList] = useState(
    // get the watchList from localStorage or set to default watchList
    localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AAPL"]
  );

  useEffect(() => {
    // save the watchList to localStorage
    localStorage.setItem("watchList", watchList.join(","));
  }, [watchList]);

  const addStock = (stock: string) => {
    // only add stock if it's not already in the watchList
    if (!watchList.includes(stock)) {
      setWatchList([...watchList, stock]);
    }
  };

  const deleteStock = (stock: string) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== stock;
      })
    );
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
