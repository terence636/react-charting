import React from 'react'
import PropTypes from 'prop-types'
import CandleStickChartSimple from  './CandleStickChartSimple'


const DashBoard = ({symbol}) => {
    return (
        <>
        <CandleStickChartSimple symbol={symbol}/>
        </>
    )
}

DashBoard.propTypes = {
    symbol: PropTypes.string.isRequired    
}

export default DashBoard
