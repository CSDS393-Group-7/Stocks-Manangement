import React, { useRef, useLayoutEffect } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Chart(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;


    let data = [
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
    x.data = data;

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
  }, []);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  ); 
}


export default Chart;