import React from "react";
import AddToWatch from './AddToWatch'
import { Link } from "react-router-dom"
import { AddToQueue } from "@material-ui/icons"


const DashboardRow = ({ symbol, price, change, setSymbol, isAdded, onAddWatchList }) => {


const handleSymbolClick = () => {
    setSymbol(symbol)
}


return (
    <tr>
      {/* <td><a href='#' onClick={handleSymbolClick}>{symbol}</a></td> */}
       <td><Link to={symbol} onClick={handleSymbolClick}>{symbol}</Link></td>
      <td>{price}</td>
      <td>{change}</td>
      {/* <td><AddToWatch symbol={symbol} isAdded={isAdded} onAddWatchListToggle={onAddWatchListToggle}/></td> */}
      {/* onClick={props.onAddWatchListToggle} */}
      {/* <AddToQueue /> */}
      <td>{!isAdded ? <AddToQueue onClick={onAddWatchList} /> : <></>}</td>

    </tr>
  );
};

export default DashboardRow;


