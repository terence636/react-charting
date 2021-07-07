import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
// import '/Users/tchan/SEI-30/react-charting/node_modules/bootstrap/dist/css/bootstrap.min.css'
import Card from './Card'

const News = (props) => {

    const [errorState, setErrorState] = useState(null)
    const [dataState, setDataState] = useState(null)

    let { symbolParam } = useParams();
    console.log("Param is", symbolParam)

    const baseURL = "https://financialmodelingprep.com/api/v3/";
    const functionType = "stock_news"; //"actives";
    const symbolName = `?tickers=${symbolParam}` //"?tickers=AAPL" //`tickers=${props.symbol}`;
    const limit = "&limit=5" //"BABA"; // PUT props.symbol here
    const apiKey = "&apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
    const URL = baseURL + functionType + symbolName + limit + apiKey;
    // https://financialmodelingprep.com/api/v3/stock_news?tickers=AAPL,FB,GOOG,AMZN&limit=50&apikey=demo

    console.log("News Component =>",props.symbol)
    console.log(URL)
    useEffect(() => {
      console.log("inside new use effect")
        fetch(URL)
          .then((res) => {
            console.log(res);
            if (!res.ok) {
              // TO HANDLE RESPONSE ERROR
              throw Error("Response error. Could not fetch data for news");
            }
            return res.json();
          })
          .then((dataReceived) => {
            // setIsPending(false);
            
            if (dataReceived["Error Message"] !== undefined)
              throw Error(
                `Fetch News Return With Error => ${dataReceived["Error Message"]}`
              );
            console.log("News Data",dataReceived);
            // const data = processData(dataReceived);
            setDataState(dataReceived);
            setErrorState(null)
          })
          .catch((err) => {
            // HERE IS TO CATCH NETWORK ERROR
            // setIsPending(false);
            setErrorState(err.message);
          });
      }, [symbolParam]);


      if (errorState !== null) return <div>{errorState}</div>;
      if (dataState === null) return <div>Loading...</div>;

      const newsList = dataState.map((news,index)=>{
        return <Card key={index} symbol={news.symbol} title={news.title} img={news.image} site={news.site} 
                summary={news.text} url={news.url}/>

      })

//       "symbol": "PLTR",
// "publishedDate": "2021-07-02 14:39:00",
// "title": "Palantir Has Quietly Become a Major SPAC Investor",
// "image": "https://cdn.snapi.dev/images/v1/n/y/im-363789-893406.jpg",
// "site": "Barrons",
// "text": "The data analytics company has invested over $100 million in at least eight SPAC-related transactions, using the deals as a way to win business from emerging companies.",
// "url": "https://www.barrons.com/articles/palantir-stock-spac-ipo-51625250285"

    return (
        <div className="newsContainer">
            {newsList}
        </div>
    )
}

export default News
