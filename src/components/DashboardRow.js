import React, {useState} from "react";
import { Link } from "react-router-dom"
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalVerticallyCentered from './ModalVerticallyCentered'

const DashboardRow = ({ symbol, price, change, setSymbol, isAdded, onAddWatchList }) => {
  const [dataReceived, setDataReceived]  = useState("")
  const [modalShow, setModalShow] = useState(false)
  

// const handleSymbolClick = () => {
//     setSymbol(symbol)
// }

const onMoreInfo = () => {
  console.log("moreInfo from mainlist")
  //Fectch symbol data and add to watchlist
  const baseURL = "https://financialmodelingprep.com/api/v3/";
  const functionType = "profile/";
  const apiKey =
    "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
  const URL = baseURL + functionType + symbol + apiKey;

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
      console.log(`${symbol} Profile Received`, dataReceived)
      console.log(dataReceived[0].symbol)
      setDataReceived(dataReceived[0])
      setModalShow(true)
    })
    .catch((err) => {
      console.log(err)
            
    });
}



return (
    <tr>
      <td><Link to={symbol} onClick={()=>setSymbol(symbol)}>{symbol}</Link></td>
      <td>{price}</td>
      <td>{change}</td>
      {/* <td><AddToWatch symbol={symbol} isAdded={isAdded} onAddWatchListToggle={onAddWatchListToggle}/></td> */}
      {/* onClick={props.onAddWatchListToggle} */}
      {/* <AddToQueue /> */}
      <td>{!isAdded ? <AddBoxTwoToneIcon onClick={onAddWatchList} /> : <></>}</td>
      <td><InfoTwoToneIcon onClick={onMoreInfo}/></td>

      <ModalVerticallyCentered
        show={modalShow}
        onHide={() => setModalShow(false)}
        data = {dataReceived}
      />
    </tr>
  );
};

export default DashboardRow;




