import React, {useRef} from "react";
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const Header = ({setSymbol}) => {
   const inputRefSymbol = useRef()

   const handleAdd = () => {
        console.log(inputRefSymbol.current.value)
        // setSymbol(inputRefSymbol.current.value)
   }

   window.addEventListener("keyup",(event)=> {
    //    console.log("keyup")
        if(event.keyCode === 13) { // DETECT ENTER PRESS
            console.log(inputRefSymbol.current.value)
            setSymbol(inputRefSymbol.current.value)
        }
   })
  return (
    <div className="nav">
      {/* <div className="nav-item"><span className="nav-logo"><Link to="/">AWESOMECHART</Link></span></div> */}
      <div className="nav-item"><span className="nav-logo">AWESOMECHART</span></div>
      <div className="nav-item"><Link to="/dashboard">Dashboard</Link></div>
      <div className="nav-item"><Link to="/scanner">Scanner</Link></div>
      <div className="nav-item">
          <input type="text" placeholder="symbol" ref={inputRefSymbol}/>
          <button onClick={handleAdd}>Add</button>
      </div>
      

   </div>
  );
}

Header.propTypes = {
    setSymbol: PropTypes.func.isRequired

}
export default Header
