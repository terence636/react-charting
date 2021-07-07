// import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React, {useState, useEffect } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import firebaseConfig from './firebaseConfig'


// BELOW ARE ALL COMPONENTS
import Header from './components/Header'
import DashBoard from './components/DashBoard';
import News from './components/News'
// import Home from './components/Home'

function App() {
  const [symbol, setSymbol] = useState("AAPL")
  const [watchlist, setWatchList] = useState([])
  

  useEffect(()=> {

    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('watchlist/').once('value').then((snapshot) => {
      if (snapshot.exists()) {
            // console.log("snapshot",snapshot.val());
            const symbolList=snapshot.val()
            console.log("firebasedb", symbolList)
            let initWatchlit = []
            for(let ticker of snapshot.val()) {
              const temp = {ticker, price: "", changePercentage:""}
              initWatchlit.push(temp)
            }
            
            setWatchList(initWatchlit)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
  },[])
 

  // // Get a reference to the database service
  // const database = firebase.database();
  // console.log("firebase DB", database)

 
// dbRef.child("users").child("userId").get().then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log("snapshot",snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });


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


// PROPS TYPE
// array, bool, func, number, object, string, symbol
