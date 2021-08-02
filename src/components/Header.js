import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "firebase/database";
import getSingleStockQuoteUrl from '../utils'

const Header = ({ symbol, setSymbol, onAddWatchList }) => {
  const inputRefSymbol = useRef();
  let history = useHistory();

  const handleLetsGo = () => {
    console.log("Handle Lets Go",inputRefSymbol.current.value);
    if(inputRefSymbol.current.value === "")
      alert("Please enter a symbol")
    else {
    history.push(inputRefSymbol.current.value.toUpperCase());
    setSymbol(inputRefSymbol.current.value.toUpperCase());
    inputRefSymbol.current.value = "";
    }
  };

  const handleAddToWatch = () => {
 
    if (inputRefSymbol.current.value === "") return;
    //Fectch individual symbol data and add to watchlist
    // const baseURL = "https://financialmodelingprep.com/api/v3/";
    // const functionType = "quote/";
    // const symbol = inputRefSymbol.current.value.toUpperCase();
    // const apiKey =
    //   "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY1;
    // const URL = baseURL + functionType + symbol + apiKey;
    const URL = getSingleStockQuoteUrl(inputRefSymbol.current.value.toUpperCase())

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
        dataReceived[0].ticker = dataReceived[0].symbol;
        dataReceived[0].changesPercentage = (Math.sign(parseInt(dataReceived[0].changesPercentage)) === 1) ? 
                                            `+${dataReceived[0].changesPercentage}` : dataReceived[0].changesPercentage
        console.log("Header Add Watch =>", dataReceived[0]);
        inputRefSymbol.current.value = "";
        onAddWatchList(dataReceived[0])
           

      })
      .catch((err) => {
        console.log(err)
              
      });
  };
  
  //    window.addEventListener("keyup",(event)=> {
  //     //    console.log("keyup")
  //         if(event.keyCode === 13) { // DETECT ENTER PRESS
  //             console.log(inputRefSymbol.current.value)
  //             setSymbol(inputRefSymbol.current.value.toUpperCase())
  //         }
  //    })
  
  return (
    <div className="nav">
      {/* <div className="nav-item"><span className="nav-logo"><Link to="/">AWESOMECHART</Link></span></div> */}
      {/* <div className="nav-item"><Link to="/"><span className="nav-logo">AWESOMECHART</span></Link></div> */}
      <div className="nav-item">
        <span className="nav-logo">iCHART</span>
      </div>
      <div className="nav-item">
        <Link to={`/Dashboard/${symbol}`}>Dashboard</Link>
      </div>
      <div className="nav-item">
        <Link to={`/News/${symbol}`}>News</Link>
      </div>
      <div className="nav-item">
        <input
          type="text"
          maxLength="5"
          placeholder="symbol"
          ref={inputRefSymbol}
        />
      </div>
      <div>
        <button className="letsgo" onClick={handleLetsGo}>
          View
        </button>
      </div>
      <div>
        <button className="letsgo" onClick={handleAddToWatch}>
          Add To Watch
        </button>
      </div>
      {/* </div> */}
      <div className="nav-item">
        {/* Version 7.7 */}
      </div>
    </div>
  );
};


Header.propTypes = {
  setSymbol: PropTypes.func.isRequired,
};
export default Header;
