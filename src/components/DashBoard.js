import React from "react";
import PropTypes from "prop-types";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"
import Category from './Category.js'
import DashboardCol from './DashboardCol'
import Watchlist from './Watchlist'
import CandleStickChartStoch from './CandleStickChartStoch'

// HERE WILL HAVE 3 COMPONENTS
// 1. LEFT NAV BAR, 2. DASHBOARD, 3. CHARRTS


// const categoryList = ["ACTIVE","INDEX","TOP","WATCHLISTS"] 
const catSelection = (state, action) => {
  switch(action){
    case "MOST ACTIVES":
        console.log("actives")
        return "actives"
    case "30 TOP GAINERS":
        console.log("gainers")
        return "gainers"
    case "30 TOP LOSERS":
        console.log("losers")
        return "losers"
    case "WATCHLISTS":
        console.log("watchlist")
        return "watchlist"
    default:
        break;
  }

}



const DashBoard = ({ symbol, setSymbol, watchlist, onAddWatchList, onRemoveWatchList}) => {
    
    const [category, dispatch] = React.useReducer(catSelection, "actives")
  
    let { symbolParam } = useParams();
    console.log("Param is", symbolParam)

  return (
  
    <Container fluid>
      <Row>
              <Col md={6} xl={2} className="cat">
                <h6>CATEGORY</h6>
                <Category category={category} catSelection={dispatch}/>
              </Col>
              <Col md={6} xl={3} className="dash">
              {category !== "watchlist" ?
             ( 
            <DashboardCol category={category} watchlist={watchlist} setSymbol={setSymbol} onAddWatchList={onAddWatchList} />
             ):
             ( 
            <Watchlist watchList={watchlist} setSymbol={setSymbol} onRemoveWatchList={onRemoveWatchList}/>
             )}

              </Col>
              <Col md= {12} xl={7} className="chart">
              <CandleStickChartStoch className="candlechart" symbol={symbol} symbolParam={symbolParam}/>
              </Col>
      </Row>

    </Container> 
  );
};

DashBoard.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default DashBoard;

