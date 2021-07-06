// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, {useState} from 'react'

// BELOW ARE ALL COMPONENTS
import Header from './components/Header'
import DashBoard from './components/DashBoard';
import News from './components/News'
// import Home from './components/Home'

function App() {
  const [symbol, setSymbol] = useState("AAPL")
  const [watchlist, setWatchList] = useState([])

   const onAddWatchList = (stockObj) => {
      if(watchlist.every(s=>s.ticker !== stockObj.ticker))
      // if(watchlist.includes(symbol) === false)
        setWatchList(prev=>[...prev,stockObj])
      console.log(stockObj)
      console.log(watchlist)
    }

    const onRemoveWatchList = (symbol) => {
      // const index = wathclist.findIndex(symbol)
      const newlist = watchlist.filter((d)=>d.ticker !== symbol)
        setWatchList(newlist)
    }

  return (
    <Router>
    {/* <div className="App"> */}
    <div>
      <Header symbol={symbol} setSymbol={setSymbol} onAddWatchList={onAddWatchList}/>
      <Switch>
        <Route exact path ="/">
        <Redirect to={`/Dashboard/${symbol}`} />
        </Route>
        <Route path="/News/:symbolParam">
          <News symbol={symbol}/>
        </Route>
        <Route path="/Dashboard/:symbolParam" >
          <DashBoard symbol={symbol} setSymbol={setSymbol} watchlist={watchlist} onAddWatchList={onAddWatchList} onRemoveWatchList={onRemoveWatchList}/>,
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;


// PROPS TYPE
// array, bool, func, number, object, string, symbol
