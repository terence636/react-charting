import React, { useEffect, useState } from "react";
import { timeParse } from "d3-time-format";
import { format } from "d3-format"
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	BarSeries,
	StraightLine,
	CandlestickSeries,
	LineSeries,
	StochasticSeries,
} from "react-stockcharts/lib/series";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import {
	OHLCTooltip,
	MovingAverageTooltip,
	StochasticTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, stochasticOscillator } from "react-stockcharts/lib/indicator";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";

const stoAppearance = {
	stroke: Object.assign({},
		StochasticSeries.defaultProps.stroke)
};

// I NEED CHART TYPE AND DATA IN PROPS
const CandleStickChartStoch = (props) => {
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

  const height = 750;
  const margin = { left: 70, right: 70, top: 20, bottom: 30 };
  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;

  const showGrid = true;
  const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 } : {};
  const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.1 } : {};

	const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d, c) => {d.ema20 = c;})
			.accessor(d => d.ema20);

		const ema50 = ema()
			.id(2)
			.options({ windowSize: 50 })
			.merge((d, c) => {d.ema50 = c;})
			.accessor(d => d.ema50);
    const slowSTO = stochasticOscillator()
			.options({ windowSize: 14, kWindowSize: 3 })
			.merge((d, c) => {d.slowSTO = c;})
			.accessor(d => d.slowSTO);
		const fastSTO = stochasticOscillator()
			.options({ windowSize: 14, kWindowSize: 1 })
			.merge((d, c) => {d.fastSTO = c;})
			.accessor(d => d.fastSTO);
    const fullSTO = stochasticOscillator()
			.options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
			.merge((d, c) => {d.fullSTO = c;})
			.accessor(d => d.fullSTO);

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

  const calculatedData = ema20(ema50(slowSTO(fastSTO(fullSTO(allData)))));
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);
  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];

  return (
    <div className="candlechart">
      <h1><span className="symbolName">{symbolName}</span> </h1>
      {/* {error && <div><hr />state err.message - {error}<hr /></div>} */}
      {/* <h6><span className="closePrice">${data[data.length-1].close}</span> Windows{width}</h6> */}
      <span className="closePrice">${data[data.length-1].close}</span>
      {/* <hr /> */}
      <ChartCanvas
        height={height}
        ratio={1.25}
        width={780}
        margin={margin}
        type="svg"
        seriesName={symbolName}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
       <Chart id={1} height={325}
					yExtents={d => [d.high, d.low]}
					padding={{ top: 10, bottom: 20 }}
				>
					<YAxis axisAt="right" orient="right" ticks={5} {...yGrid}/>
					<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />

					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<CandlestickSeries />

					<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					<LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>

					<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
					<CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

					<StraightLine type="vertical" xValue={608} />;
					<StraightLine type="vertical" xValue={558} strokeDasharray="Dot" />;
					<StraightLine type="vertical" xValue={578} strokeDasharray="LongDash" />;

					<OHLCTooltip origin={[-40, -10]}/>
					<MovingAverageTooltip
						onClick={e => console.log(e)}
						origin={[-38, 5]}
						options={[
							{
								yAccessor: ema20.accessor(),
								type: ema20.type(),
								stroke: ema20.stroke(),
								windowSize: ema20.options().windowSize,
							},
							{
								yAccessor: ema50.accessor(),
								type: ema50.type(),
								stroke: ema50.stroke(),
								windowSize: ema50.options().windowSize,
							},
						]}
					/>
				</Chart>
        <Chart id={2}
					yExtents={d => d.volume}
					height={100} origin={(w, h) => [0, h - 475]}
				>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
				</Chart>
        <Chart id={3}
					yExtents={[0, 100]}
					height={125} origin={(w, h) => [0, h - 375]} padding={{ top: 10, bottom: 10 }}
				>
					<XAxis axisAt="bottom" orient="bottom" {...xGrid} />
					<YAxis axisAt="right" orient="right"
						tickValues={[20, 50, 80]} />

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />
					<StochasticSeries
						yAccessor={d => d.fullSTO}
						{...stoAppearance} />

					<StochasticTooltip
						origin={[-38, 15]}
						yAccessor={d => d.fullSTO}
						options={fullSTO.options()}
						appearance={stoAppearance}
						label="Full STO" />
				</Chart>
        {/* <Chart id={3} origin={(w, h) => [0, h - 200]} height={100} yExtents={d => d.volume}>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
					<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
				</Chart> */}
      <CrossHairCursor />
      </ChartCanvas>
    </div>
  );
};

export default CandleStickChartStoch;

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


