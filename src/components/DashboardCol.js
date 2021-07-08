import React, { useEffect, useState } from "react";
import DashboardRow from './DashboardRow'

// 1. Form A Table
// 2. Iterate through a stock list and form the row
// 3. Bind the row to a router link and pass back the symbol using param
// 4. So that when click can display chart, details, etc

// How to get stock list
// 1. From API
// 2. Form the URL using props.selection
// 2. Iterate the list and form DashboardRow


const DashboardCol = (props) => {
    const [errorState, setErrorState] = useState(null)
    const [dataState, setDataState] = useState(null)

    const baseURL = "https://financialmodelingprep.com/api/v3/";
    const functionType = props.category; //"actives";
    const apiKey = "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
    const URL = baseURL + functionType + apiKey;

  useEffect(() => {
    

    fetch(URL)
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          // TO HANDLE RESPONSE ERROR
          throw Error("Could not fetch data for dashboard column");
        }
        return res.json();
      })
      .then((dataReceived) => {
        // setIsPending(false);
        if (dataReceived["Error Message"] !== undefined)
          throw Error(
            `Dashboard Column data return with error => ${dataReceived["Error Message"]}`
          );
        
        for(let stock of dataReceived) {
          const index = stock.changesPercentage.indexOf('%')
          stock.changesPercentage = stock.changesPercentage.slice(1,index)
        }
        console.log("DashboardCol=>",dataReceived);
        // const data = processData(dataReceived);
        setDataState(dataReceived);
        setErrorState(null)
      })
      .catch((err) => {
        // HERE IS TO CATCH NETWORK ERROR
        // setIsPending(false);
        setErrorState(err.message);
      });
  }, [props.category]);

  // {errorState && <div>state err.message - {errorState}</div>}
  if (errorState !== null) return <div>Error - {errorState}</div>
  if (dataState === null) return <div>Loading...</div>;

  // FROM DATA RECEIVED ITERATE THE lIST USING MAP
  const stockList = dataState.map((stock,index)=>{
    // const newChange = stock.changesPercentage.slice(1,6)
    return <DashboardRow key={index} symbol={stock.ticker} price={stock.price} change={stock.changesPercentage} 
        setSymbol={props.setSymbol}
        isAdded={props.watchlist.some((s)=>s.ticker===stock.ticker)}
        onAddWatchList={()=>props.onAddWatchList(stock)}
        />
  })

  const d = new Date();
  const yesterday = `${d.getDate()-1}`+'-'+`${d.getMonth()+1}`+'-'+d.getFullYear()
  // console.log("today",today)

  return (
    <div className="scrollable">
      {/* <div>({props.category.toUpperCase()})</div> */}
      <h6>({yesterday})</h6>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change(%)</th>
          </tr>
        </thead>
        <tbody>           
            {stockList}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCol;
