import React, { useEffect, useState } from "react";
import { timeParse } from "d3-time-format";
import { format } from "d3-format"
import { ChartCanvas, Chart } from "react-stockcharts";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";

// I NEED CHART TYPE AND DATA IN PROPS
const CandleStickChartSimple = (props) => {
  // State
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [allData, setAllData] = useState(null);
  const [symbolName, setSymbolName] = useState("")
  const [width, setWidth] = useState(window.innerWidth)

  // Below are for financial modelling grep
  // https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=demo
  const baseURL = "https://financialmodelingprep.com/api/v3/";
  const functionType = "historical-price-full/";
  const symbol = props.symbolParam //"BABA"; // PUT props.symbol here
  const apiKey = "?apikey=" + process.env.REACT_APP_FINANCIALMODELINGPREP_API_KEY;
  const URL = baseURL + functionType + symbol + apiKey;
  // const URL1 = 'https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=316ff3fb75ec7264440cd255a2cede4e'

  console.log("apiKey", apiKey);

  const updateDimensions = () => {
    const width = window.innerWidth -200
    setWidth(width)
  }

  useEffect(() => {

    // updateDimensions()
    // window.addEventListener("resize", updateDimensions)

    fetch(URL)
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          // TO HANDLE RESPONSE ERROR
          throw Error("Could not fetch data for that resource");
        }
        return res.json();
      })
      .then((dataReceived) => {
        setIsPending(false);
        // console.log("data =>", data);
        // console.log("Error MSg =>", data["Error Message"])
        if (dataReceived["Error Message"] !== undefined)
          throw Error(
            `Fetch data return with error => ${dataReceived["Error Message"]}`
          );
        console.log(dataReceived);
        const data = processData(dataReceived);
        setAllData(data);
        setSymbolName(dataReceived.symbol)
        setError(null)
        console.log("allData =>", data);
        // COLLECT DATE AND PRICE POINT
        // for (let obj of data["historical"]) {
        //   stockXValuesFunction.push(obj["date"])
        //   stockYValuesFunction.push(obj["close"])
        // }
        // console.log("dataFetch", data);
        // setDataPoints(data)
        // console.log("xValues", stockXValuesFunction);
        // console.log("yValues", stockYValuesFunction);

        // setDateXValues([...stockXValuesFunction])
        // setPriceYValues([...stockYValuesFunction])
        //}
      })
      .catch((err) => {
        // HERE IS TO CATCH NETWORK ERROR
        // console.log("Network Err =>", err.message)
        // console.log("Fail to Fecth =>", err.message)
        setIsPending(false);
        setError(err.message);
      });
  }, [props.symbolParam]);

  
  // {error && <div><hr />state err.message - {error}<hr /></div>}
  if (error !== null) return <div><hr />Error - "{error}"<hr /></div>
  if (allData === null) return <div>Loading...</div>

 

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(allData);
  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [start, end];

  return (
    <div className="candlechart">
      <h1><span className="symbolName">{symbolName}</span> </h1>
      {/* {error && <div><hr />state err.message - {error}<hr /></div>} */}
      {/* <h6><span className="closePrice">${data[data.length-1].close}</span> Windows{width}</h6> */}
      <h6><span className="closePrice">${data[data.length-1].close}</span></h6>
      <hr />
      <ChartCanvas
        height={600}
        ratio={1.25}
        width={780}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type="svg"
        seriesName={symbolName}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} height={300} yExtents={(d) => [d.high, d.low]}>
          <YAxis axisAt="right" orient="right" ticks={5} />
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} />
          <CandlestickSeries />
        </Chart>
        <Chart id={2} origin={(w, h) => [0, h - 200]} height={100} yExtents={d => d.volume}>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
					<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
				</Chart>
      </ChartCanvas>
    </div>
  );
};

// CandleStickChartSimple = fitWidth(CandleStickChartSimple)

export default CandleStickChartSimple;

const processData = (dataReceived) => {
  let newData = [];
  // console.log("inside processsData", dataReceived)
  // NEED TO PARSE THE DATE
  const parseDate = timeParse("%Y-%m-%d");

  for (let aDay of dataReceived["historical"]) {
    //  console.log(aDay)
    const pointObj = {};
    const newDate = new Date(parseDate(aDay.date).getTime());
    pointObj.date = newDate; //aDay["date"]
    pointObj.open = aDay.open;
    pointObj.high = aDay.high;
    pointObj.low = aDay.low;
    pointObj.close = aDay.close;
    pointObj.volume = aDay.volume;
    pointObj.split = "";
    pointObj.dividend = "";
    pointObj.absoluteChange = "";
    pointObj.percentChange = aDay.changePercent;
    newData.unshift(pointObj);
  }

  return newData;
};


