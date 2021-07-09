// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import getSingleStockQuoteUrl from './utils.js'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, {useState, useEffect } from 'react'
import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from './firebaseConfig'


// BELOW ARE ALL COMPONENTS
import Header from './components/Header'
import DashBoard from './components/DashBoard';
import News from './components/News'

function App() {
  const [symbol, setSymbol] = useState("AAPL")
  const [watchlist, setWatchList] = useState([])
  

  useEffect(()=> {

    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('watchlist/').once('value').then((snapshot) => {
      if (snapshot.exists()) {
            // console.log("snapshot",snapshot.val());
            
            console.log("firebasedb", snapshot.val())
            let promiseAllList = []
            for(let stock of snapshot.val()) {
              const url = getSingleStockQuoteUrl(stock.ticker)
              const promise = new Promise((resolve,reject)=>resolve(fetch(url)))
              promiseAllList.push(promise)
            }
            console.log("promiseall - list",promiseAllList)

            // const url1 = getSingleStockQuoteUrl(snapshot.val()[0])
            Promise.all([...promiseAllList])
            .then( (responses) => {
              return Promise.all(
                responses.map( (response) => {
                  return response.json();
                })
              );
            })
            .then( (data) => {
              console.log("promiseall - data", data)
              let initWatchlit = []
              for(let stock of data) {
                const temp = {ticker: stock[0].symbol, price: stock[0].price, changesPercentage: stock[0].changesPercentage}
                initWatchlit.push(temp)
              }
              setWatchList(initWatchlit)
            })
            .catch( (error) => {
              console.log("promiseall error =>", error)
            })
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
  },[])
 

   const onAddWatchList = (stockObj) => {
      if(watchlist.every(s=>s.ticker !== stockObj.ticker)) {
      // if(watchlist.includes(symbol) === false)
        setWatchList(prev=>[...prev,stockObj])
        //WRITE TO FIREBASE DB
        // firebase.initializeApp(firebaseConfig);
        firebase.database().ref('watchlist/').set(
          [...watchlist, stockObj]      
        )
      }
      console.log(stockObj)
      console.log(watchlist)
    }

    const onRemoveWatchList = (symbol) => {
      // const index = wathclist.findIndex(symbol)
      const newlist = watchlist.filter((d)=>d.ticker !== symbol) 
        setWatchList(newlist)
        // firebase.initializeApp(firebaseConfig);
        firebase.database().ref('watchlist/').set(newlist)  
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
          <News /*symbol={symbol}*//>
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

// const getSingleStockQuoteUrl = (symbol) => {
  
//   const baseURL = "https://financialmodelingprep.com/api/v3/";
//   const functionType = "quote/";
//   const apiKey =
//     "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
//   const URL = baseURL + functionType + symbol.toUpperCase() + apiKey;

//   return URL;
// }

// PROPS TYPE
// array, bool, func, number, object, string, symbol
