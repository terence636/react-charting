import React from "react";
import { Link } from "react-router-dom";

const DashboardRow = ({ symbol, price, change }) => {
  return (
    <tr>
      <td>{symbol}</td>
      <td>{price}</td>
      <td>{change}</td>
    </tr>
  );
};

export default DashboardRow;

{
  /* <DashboardRow symbol={stock.ticker} price={symbol.price} change={stock.changesPercentage}/> */
}
