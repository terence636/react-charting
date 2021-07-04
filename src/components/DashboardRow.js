import React from "react";
// import { Link } from "react-router-dom";


const DashboardRow = ({ symbol, price, change, setSymbol }) => {


const handleClick = () => {
    console.log("test")
    setSymbol(symbol)
}


return (
    <tr>
      <td><a href='#' onClick={handleClick}>{symbol}</a></td>
       {/* <td><Link to={} onClick={handleClick}>{symbol}</Link></td> */}
      <td>{price}</td>
      <td>{change}</td>
    </tr>
  );
};

export default DashboardRow;

{
  /* <DashboardRow symbol={stock.ticker} price={symbol.price} change={stock.changesPercentage}/> */
}
