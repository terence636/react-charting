const getSingleStockQuoteUrl = (symbol) => {
  
    const baseURL = "https://financialmodelingprep.com/api/v3/";
    const functionType = "quote/";
    const apiKey =
      "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
    const URL = baseURL + functionType + symbol.toUpperCase() + apiKey;
  
    return URL;
}


const getWeeklyStockQuoteUrlFromVantage = (symbol) => {

    const baseURL = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol="
    const apiKey = "&apikey=" + process.env.REACT_APP_VANTAGE_API_KEY
    const URL = baseURL + symbol + apiKey;
    return URL;
}

const getSingleStockHistoricalUrl = (symbol) => {
    const baseURL = "https://financialmodelingprep.com/api/v3/";
  const functionType = "historical-price-full/";
  const apiKey = "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
  const URL = baseURL + functionType + symbol + apiKey;
  return URL
}
// https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=AAPL&apikey=XW0YLMZBBXDYRUEK
export { getWeeklyStockQuoteUrlFromVantage, getSingleStockHistoricalUrl } 
export default getSingleStockQuoteUrl

