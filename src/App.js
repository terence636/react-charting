// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, {useState} from 'react'

// BELOW ARE ALL COMPONENTS
import Header from './components/Header'
import DashBoard from './components/DashBoard';
import News from './components/News'
// import Home from './components/Home'

function App() {
  const [symbol, setSymbol] = useState("AAPL")

  return (
    <Router>
    {/* <div className="App"> */}
    <div>
      <Header symbol={symbol} setSymbol={setSymbol}/>
      <Switch>
        {/* <Route exact path ="/">
          <Home />
        </Route> */}
        {/* <Route path="/dashboard"> */}
        
        <Route path="/news">
          <News symbol={symbol}/>
        </Route>
        <Route path="/" >
          <DashBoard symbol={symbol} setSymbol={setSymbol}/>,
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;


// PROPS TYPE
// array, bool, func, number, object, string, symbol
