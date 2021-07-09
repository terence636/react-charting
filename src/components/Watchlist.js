import { Link } from "react-router-dom"
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import React, { useState } from 'react'
import ModalVerticallyCentered from './ModalVerticallyCentered'
// import getSingleStockQuoteUrl from '../utils.js'


const Watchlist = (props) => {
  const [dataReceived, setDataReceived]  = useState("")
  const [modalShow, setModalShow] = useState(false)

  const onMoreInfo = (symbol) => {

    console.log("Moreinfo from watchlist")
    //Fectch symbol data and add to watchlist
    // getSingleStockQuoteUrl

    const baseURL = "https://financialmodelingprep.com/api/v3/";
    const functionType = "profile/";
    const apiKey =
      "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
    const URL = baseURL + functionType + symbol + apiKey;

    // const URL = getSingleStockQuoteUrl(symbol)
  
    fetch(URL)
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          // TO HANDLE RESPONSE ERROR
          throw Error("Could not fetch data for add to watch");
        }
        return res.json();
      })
      .then((dataReceived) => {
        // setIsPending(false);
        if (dataReceived["Error Message"] !== undefined)
          throw Error(
            `Dashboard Column data return with error => ${dataReceived["Error Message"]}`
          );
        // pop up a modal box
        console.log(`${props.symbol} Profile Received`, dataReceived)
        // console.log(dataReceived[0].symbol)
        setDataReceived(dataReceived[0])
        setModalShow(true)
      })
      .catch((err) => {
        console.log(err)
              
      });
  }

    const list = props.watchList.map((stock,index)=>{
        return (
            <tr key={index}>
                <td><Link to={`/Dashboard/${stock.ticker}`} onClick={()=>props.setSymbol(stock.ticker)}>{stock.ticker}</Link></td>
                <td>{stock.price}</td>
                {/* <td>{stock.changesPercentage}</td> */}
                <td>{Math.sign(parseFloat(stock.changesPercentage))===1 ? <span className="upChanges">{stock.changesPercentage}</span> 
                : <span className="downChanges">{stock.changesPercentage}</span>}</td>
                <td><DeleteForeverTwoToneIcon onClick={()=>props.onRemoveWatchList(stock.ticker)} /></td>
                <td><InfoTwoToneIcon onClick={()=>onMoreInfo(stock.ticker)}/></td>
            </tr>

        )

    })

    return (
      <div className="scrollable">
      <h6>WATCHLIST</h6>
        <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change(%)</th>
          </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
      </table>
      <ModalVerticallyCentered
        show={modalShow}
        onHide={() => setModalShow(false)}
        data = {dataReceived}
      />
      </div>
    )
}

export default Watchlist
