import React from "react";
import AddToWatch from './AddToWatch'


const DashboardRow = ({ symbol, price, change, setSymbol, isFave, onAddWatchListToggle }) => {


const handleSymbolClick = () => {
    setSymbol(symbol)
}


return (
    <tr>
      <td><a href='#' onClick={handleSymbolClick}>{symbol}</a></td>
       {/* <td><Link to={} onClick={handleClick}>{symbol}</Link></td> */}
      <td>{price}</td>
      <td>{change}</td>
      <td><AddToWatch symbol={symbol} isFave={isFave} onAddWatchListToggle={onAddWatchListToggle}/></td>
    </tr>
  );
};

export default DashboardRow;

{
  /* <DashboardRow symbol={stock.ticker} price={symbol.price} change={stock.changesPercentage}/> */
}
