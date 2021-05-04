import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';


am4core.useTheme(am4themes_animated);

function Chart(props) {
  const chart = useRef(null);
  const [dataArray, setDataArray] = useState([]);

  const json2array = (json) => {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    result.push(0);
    result.push(0);
    return result;
}

  const convertDataToArray = (data) => {
    let result = [];
    for(let i = 0; i < data.length; i++) {
        const stock = json2array(data[i]);
        result.push(stock);
    }
    return result;
}

  const printAddress = () => {
    dataArray.then((a) => {
      console.log(a);
    });
  };
  useEffect(() => {
    const d = new Date();
    const currentMonth = d.getMonth();
    fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=N8PG9YE7WSOMS626")
        .then((response) => response.json())
        .then((data) => {
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
      });
  }, [])
  
  const makeDateObject = (string) => {
    const dateArray = string.split('-');
    return new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]));
  }

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);
    x.paddingRight = 20;
    // // const data = convertDataToArray(dataArray);
    // let dataPrice = data["2020-12-08"];
    // console.log(dataPrice)


    let old_data = [
      {date: new Date(2020, 1, 1), value: 12},
      {date: new Date(2020, 2, 1), value: 10},
      {date: new Date(2020, 3, 1), value: 20},
      {date: new Date(2020, 4, 1), value: 15},
      {date: new Date(2020, 5, 1), value: 17},
      {date: new Date(2020, 6, 1), value: 5},
      {date: new Date(2020, 7, 1), value: 10},
      {date: new Date(2020, 8, 1), value: 6},
      {date: new Date(2020, 9, 1), value: 3},
      {date: new Date(2020, 10, 1), value: 20},
      {date: new Date(2020, 11, 1), value: 12},
      {date: new Date(2020, 12, 1), value: 17},
    ];
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
    <div id="chartdiv" style={{ height: "450px" }}>
      {console.log(dataArray)}
    </div>
  ); 
}


export default Chart;