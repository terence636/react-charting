import React, {useState} from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
// import '/Users/tchan/SEI-30/react-charting/node_modules/bootstrap/dist/css/bootstrap.min.css'
import CandleStickChartSimple from "./CandleStickChartSimple";
import Category from './Category.js'
import DashboardCol from './DashboardCol'

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



const DashBoard = ({ symbol, setSymbol}) => {
    
    const [selection, dispatch] = React.useReducer(catSelection, "actives")
    // const [listName, setListName] = useState("DJ30")

  return (
    <div className="container1">
      <div className="row">
          <div className="col-2 cat" >
            CATEGORY
            <Category catSelection={dispatch}/>
          </div>
          <div className="col-3 dash">
            DASHBOARD
            <DashboardCol selection={selection} setSymbol={setSymbol}/>
          </div>
          <div className="col-7 chart">
            <CandleStickChartSimple className="candlechart" symbol={symbol}/>
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
