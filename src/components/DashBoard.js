import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
// import '/Users/tchan/SEI-30/react-charting/node_modules/bootstrap/dist/css/bootstrap.min.css'
import CandleStickChartSimple from "./CandleStickChartSimple";
import Category from './Category.js'
import DashboardCol from './DashboardCol'
import Watchlist from './Watchlist'
import CandleStickChartStoch from './CandleStickChartStoch'

// HERE WILL HAVE 3 COMPONENTS
// 1. LEFT NAV BAR, 2. DASHBOARD, 3. CHARRTS


// const categoryList = ["ACTIVE","INDEX","TOP","WATCHLISTS"] 
const catSelection = (state, action) => {
  switch(action){
    case "30 MOST ACTIVES":
        console.log("actives")
        return "actives"
    // case "INDEX":
    //     console.log("index")
    //     return "index"
    case "30 TOP GAINERS":
        console.log("gainers")
        return "gainers"
    case "30 TOP LOSERS":
        console.log("losers")
        return "losers"
    case "WATCHLISTS":
        console.log("watchlist")
        return "watchlist"
    default:
        break;
  }

}



const DashBoard = ({ symbol, setSymbol, watchlist, onAddWatchList, onRemoveWatchList}) => {
    
    const [category, dispatch] = React.useReducer(catSelection, "actives")
    // const [watchlist, setWatchList] = useState([])
    
    // const onAddWatchList = (stockObj) => {
    //   if(watchlist.every(s=>s.ticker !== stockObj.ticker))
    //   // if(watchlist.includes(symbol) === false)
    //     setWatchList(prev=>[...prev,stockObj])
    //   console.log(stockObj)
    //   console.log(watchlist)
    // }

    // const onRemoveWatchList = (symbol) => {
    //   // const index = wathclist.findIndex(symbol)
    //   const newlist = watchlist.filter((d)=>d.ticker !== symbol)
    //     setWatchList(newlist)
    // }
  
    let { symbolParam } = useParams();
    console.log("Param is", symbolParam)

  return (
    <div className="container-fluid p-0">
      <div className="row">
          <div className="col-2 cat" >
            CATEGORY
            <Category category={category} catSelection={dispatch}/>
          </div>
          
          {/* <div className="col-3 dash">
            {category !== "watchlist"?
            (<div className="row"> 
              DASHBOARD
            <DashboardCol category={category} watchlist={watchlist} setSymbol={setSymbol} onAddWatchList={onAddWatchList} />
            </div>) :
            (<div className="row watchlist" >
              WATCHLIST
            <Watchlist watchList={watchlist} setSymbol={setSymbol} onRemoveWatchList={onRemoveWatchList}/>
            </div>) }
          </div> */}
           <div className="col-3 dash">
            {category !== "watchlist" ?
             ( 
            <DashboardCol category={category} watchlist={watchlist} setSymbol={setSymbol} onAddWatchList={onAddWatchList} />
             ):
             ( 
            <Watchlist watchList={watchlist} setSymbol={setSymbol} onRemoveWatchList={onRemoveWatchList}/>
             )}
            </div>

          <div className="col-7 chart">
            {/* <CandleStickChartSimple className="candlechart" symbol={symbol} symbolParam={symbolParam}/> */}
            <CandleStickChartStoch className="candlechart" symbol={symbol} symbolParam={symbolParam}/>
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

