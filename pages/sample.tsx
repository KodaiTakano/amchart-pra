import React, { Component, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";



// useTheme(am4themes_animated);
export default function AmChartSample( ) {
  // // componentDidMount() {
  //   //   chart = prepareChart();
  //   // }
    
  //   // componentWillUnmount() {
  //     //   if (chart) {
  //       //     chart.dispose();
  //       //   }
  //       // }
        
  //       // const [chart , setChart] = useState<am4charts.XYChart>()
        
  //       useEffect(()=>{
  //         const chart:am4charts.XYChart = prepareChart()
  //   // setChart(chart)
  // },[])

  
  //   return (
  //     <div id='chartdiv' style={{ width: '100%', height: '500px' }}></div>
  //   );
  // // return <div className="">hello world sample</div>
  
  const divRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<am4charts.XYChart | null>(null) // chart本体のnodeとなる、chartの更新は主にこのRefを通してやる

  useLayoutEffect(() => {
    if (divRef.current) {
      const chart = am4core.create(divRef.current, am4charts.XYChart); // divRefのnodeがchartのコンテナとして適用される

      // 以降でchart周りの実装内容を記述

      chartRef.current = chart; // 最後にchartのRefを保持しておくと、別のhooks内でRefを通して色々いじることができる
      return () => chart.dispose(); // unmount時にdisposeする必要がある
    }
  }, []);

  return (
    <div>
     {/* chartのコンテナとなるRefを渡す */}
      <div ref={divRef} style={{ height: 200, width: "100%" }} />
    </div>
  )
}

function prepareChart() {
  // ... chart code goes here ...
  const chart = am4core.create('chartdiv', am4charts.XYChart);
  chart.cursor = new am4charts.XYCursor();
  chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
  chart.paddingRight = 20;

  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 60;
  dateAxis.skipEmptyPeriods = true;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.minWidth = 35;

  const candlestick = addCandlestick(chart)
  addLineSample(chart);
  addScatterSample(chart)

  const scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(candlestick);
  chart.scrollbarX = scrollbarX;
  // chart.scrollbarX = new am4core.Scrollbar();

  return chart;
}

function addCandlestick(chart) {
  const candlestick = chart.series.push(new am4charts.CandlestickSeries());
  candlestick.dataFields.dateX = 'date';
  candlestick.dataFields.valueY = 'close';
  candlestick.dataFields.openValueY = 'open';
  candlestick.dataFields.lowValueY = 'low';
  candlestick.dataFields.highValueY = 'high';
  candlestick.tooltipText = 'Open: [bold]{openValueY.value}[/]\nLow: [bold]{lowValueY.value}[/]\nHigh: [bold]{highValueY.value}[/]\nClose: [bold]{valueY.value}[/]';

  chart.data = candleData;

  return candlestick;
}

function addLineSample(chart) {
  const lineSample = chart.series.push(new am4charts.LineSeries());
  lineSample.dataFields.dateX = 'value';
  lineSample.dataFields.valueY = 'value2';
  lineSample.strokeWidth = 2
  lineSample.stroke = chart.colors.getIndex(3);
  lineSample.strokeOpacity = 0.7;
  lineSample.data = [
    { 'value': '2018-08-05', 'value2': 140 },
    { 'value': '2018-08-26', 'value2': 170 }
  ];
}

function addScatterSample(chart) {
  const lineSample = chart.series.push(new am4charts.LineSeries());
  lineSample.dataFields.dateX = 'value';
  lineSample.dataFields.valueY = 'value2';
  lineSample.strokeWidth = 2
  lineSample.stroke = chart.colors.getIndex(3);
  lineSample.strokeOpacity = 0.0;
  lineSample.data = [
    { 'value': '2018-08-08', 'value2': 140 },
    { 'value': '2018-09-03', 'value2': 150 }
  ];

  // Add a bullet
  let bullet = lineSample.bullets.push(new am4charts.Bullet());
  // Add a triangle to act as am arrow
  let arrow = bullet.createChild(am4core.Triangle);
  arrow.horizontalCenter = "middle";
  arrow.verticalCenter = "middle";
  arrow.strokeWidth = 0;
  arrow.fill = chart.colors.getIndex(0);
  arrow.direction = "top";
  arrow.width = 12;
  arrow.height = 12;
}

const candleData = [{
  "date": "2018-08-01",
  "open": "136.65",
  "high": "136.96",
  "low": "134.15",
  "close": "136.49"
}, {
  "date": "2018-08-02",
  "open": "135.26",
  "high": "135.95",
  "low": "131.50",
  "close": "131.85"
}, {
  // ...略
}, {
  "date": "2018-10-16",
  "open": "172.69",
  "high": "173.04",
  "low": "169.18",
  "close": "172.75"
}];

// export default AmChartSample;