import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
// import '/Users/tchan/SEI-30/react-charting/node_modules/bootstrap/dist/css/bootstrap.min.css'
import CandleStickChartSimple from "./CandleStickChartSimple";
import Category from './Category.js'
import DashboardCol from './DashboardCol'
import Watchlist from './Watchlist'

// HERE WILL HAVE 3 COMPONENTS
// 1. LEFT NAV BAR, 2. DASHBOARD, 3. CHARRTS


// const categoryList = ["ACTIVE","INDEX","TOP","WATCHLISTS"] 
const catSelection = (state, action) => {
  switch(action){
    case "ACTIVE":
        console.log("active")
        return "actives"
    case "INDEX":
        console.log("index")
        return "index"
    case "TOP GAINERS":
        console.log("gainers")
        return "gainers"
    case "TOP LOSERS":
        console.log("losers")
        return "losers"
    case "WATCHLISTS":
        console.log("watchlist")
        return "watchlist"
    default:
        break;
  }

}



const DashBoard = ({ symbol, setSymbol }) => {
    
    const [selection, dispatch] = React.useReducer(catSelection, "actives")
    const [watchList, setWatchList] = useState([])

    const onAddWatchListToggle = (symbol) => {
      setWatchList(prev=>[...prev,symbol])
      console.log(symbol)
      console.log(watchList)
    }
  
    let { symbolParam } = useParams();
    console.log("Param is", symbolParam)

  return (
    <div className="container-fluid p-0">
      <div className="row">
          <div className="col-2 cat" >
            CATEGORY
            <Category catSelection={dispatch}/>
          </div>
          <div className="col-3">
          <div className="row mainlist">
            DASHBOARD
            <DashboardCol selection={selection} setSymbol={setSymbol} onAddWatchListToggle={onAddWatchListToggle} />
            </div>
            <div className="row watchlist" >
              WATCHLIST
            <Watchlist watchList={watchList}/>
            </div>
            
          </div>
          <div className="col-7 chart">
            <CandleStickChartSimple className="candlechart" symbol={symbol} symbolParam={symbolParam}/>
          </div>
      </div>
    </div>
    // ADD ANOTHER COLUMN FOR STOCK DETAILS. BELOW THE CHART
  );
};

DashBoard.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default DashBoard;
