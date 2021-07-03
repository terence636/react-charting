import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'
import React, {useState} from 'react'

// BELOW ARE ALL COMPONENTS
import Header from './components/Header'
// import CandleStickChartSimple from "./components/CandleStickChartSimple"
import DashBoard from './components/DashBoard';

function App() {
  const [symbol, setSymbol] = useState("AAPL")

  // const handleSetSymbol = () => {
  //   console.log("Handle Set Symbol")
  // }

  return (
    <Router>
    <div className="App">
      <Header setSymbol={setSymbol}/>
      <DashBoard symbol={symbol}/>,
      {/* <CandleStickChartSimple symbol={symbol}/> */}
    </div>
    </Router>
  );
}

export default App;


// PROPS TYPE
// array, bool, func, number, object, string, symbol
