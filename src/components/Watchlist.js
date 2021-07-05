import { Link } from "react-router-dom"
import { RemoveFromQueue } from '@material-ui/icons'
import React from 'react'

const Watchlist = (props) => {
  // onClick={handleSymbolClick}
    const list = props.watchList.map((stock,index)=>{
        return (
            <tr key={index}>
                <td><Link to={`/Dashboard/${stock.ticker}`} onClick={()=>props.setSymbol(stock.ticker)}>{stock.ticker}</Link></td>
                {/* <td>{stock.ticker}</td> */}
                <td>{stock.price}</td>
                <td>{stock.changesPercentage}</td>
                <td><RemoveFromQueue onClick={()=>props.onRemoveWatchList(stock.ticker)} /></td>
            </tr>

        )

    })


    return (
        <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
      </table>
    )
}

export default Watchlist
