import React, {useRef} from "react";
import { Link, useHistory } from "react-router-dom"
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core';
// import {AddToQueue, RemoveFromQueue} from "@material-ui/icons"

const Header = ({symbol, setSymbol}) => {
   const inputRefSymbol = useRef()
   let history = useHistory();

   const handleLetsGo = () => {
        console.log(inputRefSymbol.current.value)
        history.push(inputRefSymbol.current.value.toUpperCase())
        setSymbol(inputRefSymbol.current.value.toUpperCase())
        inputRefSymbol.current.value = ''
   }

   const handleAddToWatch = () => {

   }

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
      <div className="nav-item"><span className="nav-logo">iFinance</span></div>
      <div className="nav-item"><Link to={`/Dashboard/${symbol}`}>Dashboard</Link></div>
      <div className="nav-item"><Link to={`/News/${symbol}`}>News</Link></div>
      <div className="nav-item">
          <input type="text" maxlength="5" placeholder="symbol" ref={inputRefSymbol}/>
          <button className="letsgo" onClick={handleLetsGo}>Let's Go...</button>
          <button className="letsgo" onClick={handleAddToWatch}>Add To Watch</button>

      </div>
      

   </div>
  );
}

Header.propTypes = {
    setSymbol: PropTypes.func.isRequired

}
export default Header
