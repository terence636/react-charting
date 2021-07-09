# iChart

## Description

An app that allow investor to do some technical analysis of US stocks.
Help them make informed decision before buying the stock. 


## Dependencies for this project are:-
```
- React
- React Bootstrap
- React Router
- React stockcharts - Ragu Ramaswamy  @github.com/rrag/react-stockcharts
- Firebase
- Material-UI
```

## APIs Used

```
- FinancialModellingPrep API
- AlphaVantage API
```

## Wireframes

There are 2 main screens, namely the Dashboard and News

DASHBOARD SCREEN

<img width="1435" alt="Screenshot 2021-07-08 at 10 29 56 PM" src="https://user-images.githubusercontent.com/32205869/124939961-23e80580-e03c-11eb-82ca-d82297f4323a.png">

NEWS SCREEN

<img width="1437" alt="Screenshot 2021-07-08 at 10 36 36 PM" src="https://user-images.githubusercontent.com/32205869/124941040-11220080-e03d-11eb-88bc-4979d8a34115.png">



## User Stories

- Due to limitations of free API calls, not able to have a stock screening application
- As we need 1 API call for 1 stock and US market has thousand of stocks. Hence not feasible

As for now, there are 4 categories for Dashboard  area:-

```
- Most Actives - 1 API call
- Top Gainers - 1 API call
- Top Losers - 1 API call
- Watchlist - Each stock 1 API call 
```

- Click on the category item, will list the stocks at the Stock Listing Section Column
- Clicking on stock symbol will bring up the stock chart
- Click '+' icon to add to watchlist
- Click 'i' icon for company info
- Watchlist readme from firebase real-time DB
- At the header, enter a stock symbol, click on 'Add to watch' to add to watch list
- click on 'view' to view the chart or view the news depending on which main page you are in 


As for news page:-
- enter symbol and click view will display 5 news 
- click on news details will bring you to the news website


## Chart 

- Candlestick chart with 20/50 EMA. 
- Daily and Weekly selection
  - Single candle represent daily or wekkly
- Full stochastics indicator (Green line is fast and pink line is slow)
- Volume bar



## Development Design

- React Compononents

```
- Header
- Category
- Dashboard Column
- Dashboard Row
- Chart
- Watchlist
- Modal - (React Bootstrap)
- News - (Bootstrap Card)
```

- React Router

```
- Dasboard/{symbol}
- News/{symbol}
```

- For wathclist, using promise.all. One API call for each stock
- Firebase database for watchlist 
- useReducer for category selection
- useEffect and fetch() method for API request. Will trigger re-render and API request when param or state change
- WindowWidth event listener to resize the chart according
- CSS @media and grid col to resize the column according to window width 



## Further development

- Code Refactoring (DRY stuffs)
- Real-time chart. Inorporate latest data into chart
- Real-time data for watchlist or a button click to update latest price
- Additional Category e.g. Index, Crypto, Screening
- Monthly chart
- Dropdown list for symbol input box
- Responsive for mobile
- Login page
- Error handling

 ## References

```
Ragu Ramaswamy  @github.com/rrag/react-stockcharts
AlphaVantage API
FinancialModellingPrep API

```