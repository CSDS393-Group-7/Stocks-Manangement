import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';


am4core.useTheme(am4themes_animated);

function Chart(props) {
  const chart = useRef(null);
  const [dataArray, setDataArray] = useState([]);
  const [current, setCurrent] = useState('');
  const [stockName, setStockName] = useState('');
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }
  const BASE_URI = "http://localhost:8000";
  useEffect(() => {
    const dataFetch = async () => {
      const stockList = await axios.get("http://localhost:8000/api/stock/topMentionedWallStreetSub");
      const randomStock = stockList.data[getRandomInt(stockList.data.length - 1)];
      setCurrent(randomStock);
      const reqData = {"stock": randomStock};
      const name = await axios.post(BASE_URI + "/api/stock/stockName", reqData);
      setStockName(name.data.name);
      await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${randomStock}&apikey=N8PG9YE7WSOMS626`)
        .then((response) => response.json())
        .then((data) => {
          if(data) {
            const dataFetch = Object.entries(data["Time Series (Daily)"]);
          setDataArray(data => {
            data = [];
            for(let i = 0; i < 30; i++) {
              const day = dataFetch[i][0];
              const value = dataFetch[i][1];
              const element = {date: makeDateObject(day), value: value["4. close"]}
              data.push(element);
            }
            return [...data];
          })
          }
      });
    }
    dataFetch();
    const interval = setInterval(dataFetch, 60000);
    return () => clearInterval(interval);
  }, [])
  
  const makeDateObject = (string) => {
    const dateArray = string.split('-');
    return new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]));
  }

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);
    x.paddingRight = 20;
    x.data = dataArray;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 50;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [dataArray]);

  return (
    <React.Fragment>
      {console.log(dataArray)}
      <div id="chartdiv" style={{ height: "450px" }}>
      
      </div>
      <div>
        <h2> {`${current}: ${stockName}`} </h2> 
      </div>
    </React.Fragment>
  ); 
}

export default Chart;