import React from "react";
import {
  Chart,
  Tooltip,
  Schema,
  Interaction,
  Annotation,
  Point,
  Axis,
  Legend
} from "bizcharts";
import { DataView } from "@antv/data-set";
import GeorgiaDistrictsDataWithoutGeoposition from "../../../../static/GA_districts_without_geoposition";

export default class Demo extends React.Component {
  render() {
    const data = [
      {
        x: "01",
        low: 0.01,
        q1: 0.025,
        median: 0.05,
        q3: 0.075,
        high: 0.1,
      },
      {
        x: "02",
        low: 0.01,
        q1: 0.025,
        median: 0.075,
        q3: 0.1,
        high: 0.15,
      },
      {
        x: "03",
        low: 0.01,
        q1: 0.05,
        median: 0.1,
        q3: 0.15,
        high: 0.2,
      },
      {
        x: "04",
        low: 0.05,
        q1: 0.1,
        median: 0.15,
        q3: 0.2,
        high: 0.25,
      },
      {
        x: "05",
        low: 0.1,
        q1: 0.15,
        median: 0.2,
        q3: 0.25,
        high: 0.3,
      },
      {
        x: "06",
        low: 0.15,
        q1: 0.2,
        median: 0.25,
        q3: 0.3,
        high: 0.35,
      },
      {
        x: "07",
        low: 0.2,
        q1: 0.25,
        median: 0.3,
        q3: 0.35,
        high: 0.4,
      },
      {
        x: "08",
        low: 0.25,
        q1: 0.3,
        median: 0.35,
        q3: 0.4,
        high: 0.45,
      },
      {
        x: "09",
        low: 0.3,
        q1: 0.35,
        median: 0.4,
        q3: 0.45,
        high: 0.5,
      },
      {
        x: "10",
        low: 0.35,
        q1: 0.4,
        median: 0.45,
        q3: 0.5,
        high: 0.55,
      },
      {
        x: "11",
        low: 0.4,
        q1: 0.45,
        median: 0.5,
        q3: 0.55,
        high: 0.6,
      },
      {
        x: "12",
        low: 0.45,
        q1: 0.5,
        median: 0.55,
        q3: 0.6,
        high: 0.65,
      },
      {
        x: "13",
        low: 0.5,
        q1: 0.55,
        median: 0.6,
        q3: 0.65,
        high: 0.7,
      },
      {
        x: "14",
        low: 0.55,
        q1: 0.6,
        median: 0.65,
        q3: 0.7,
        high: 0.75,
      },
    ];

    for (let i = 0; i < data.length; i++) {
      let districtId = data[i]["x"];
      let BVAPPercentage = GeorgiaDistrictsDataWithoutGeoposition[districtId]["BVAP%"]
      let rounded = Math.round((BVAPPercentage + Number.EPSILON) * 100) / 100
      data[i]["BVAPPercentage"] = rounded
    }

    const dv = new DataView().source(data);

    dv.transform({
      type: "map",
      callback: (obj) => {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
      },
    });

    const scale = {
      x:{
        alias:'Indexed Districts', // 别名
      },
      BVAPPercentage:{
        alias:"BVAP%",
        min: 0,
        max: 1,
        nice: true
      },
      range:{
        alias:"BVAP%",
        min: 0,
        max: 1,
        nice: true
      }
    };

    return (
      <Chart
        height={500}
        data={dv.rows}
        autoFit
        scale={{
          range: {
            max: 1,
            nice: true,
          },
        }}
        scale={scale}
        padding="auto"
      >
        <Axis name="x" position="bottom" title/>
        <Axis name="BVAP%" position="left" title/>
        <Axis name="range" position="right" title/>

        <Tooltip
          showTitle={false}
          showMarkers={false}
          itemTpl={
            '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            "{name}<br/>" +
            '<span style="padding-left: 16px">high: {high}</span><br/>' +
            '<span style="padding-left: 16px">q3: {q3}</span><br/>' +
            '<span style="padding-left: 16px">median: {median}</span><br/>' +
            '<span style="padding-left: 16px">q1: {q1}</span><br/>' +
            '<span style="padding-left: 16px">low: {low}</span><br/>' +
            "</li>"
          }
        />

        <Point
          position="x*BVAPPercentage"
          // label="BVAPPercentage"
          style={{
            fill: "rgb(0, 0, 255)",
          }}
        />

        <Schema
          position={"x*range"}
          shape="box"
          style={{
            stroke: "#545454",
            fill: "#1890FF",
            fillOpacity: 0.3,
          }}
          tooltip={[
            "x*low*q1*median*q3*high",
            (x, low, q1, median, q3, high) => {
              return {
                name: x,
                low,
                q1,
                median,
                q3,
                high,
              };
            },
          ]}
        />
        <Interaction type={"active-region"} />

        <Annotation.Region
          start={["min", "0.33"]}
          end={["max", "0.5"]}
          style={{
            fill: "rgb(0, 153, 51)",
          }}
        />
      </Chart>
    );
  }
}
