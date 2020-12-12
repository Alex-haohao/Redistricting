import React from "react";
import {
  Chart,
  Tooltip,
  Schema,
  Interaction,
  Annotation,
  Point,
  Axis,
  // Legend
} from "bizcharts";
import { DataView } from "@antv/data-set";
import { Table} from 'antd';


export default class Demo extends React.Component {
  render() {

    let newData = this.props.data
    let minID = newData[0].boxId
    newData.forEach(element => {
      element.boxId = (element.boxId - minID +1).toString()
    });


    const minorities = this.props.minorities.join("+") + " VAP%"
    const percentage = this.props.minorities.join("+") + " VAPPercentage%"

    let BVAPPercentages = this.props.demographic

    for (let i = 0; i < newData.length; i++) {
      newData[i]["BVAPPercentage"] = BVAPPercentages[i]
    }

    const dv = new DataView().source(newData);
    dv.transform({
      type: "map",
      callback: (obj) => {
        obj.range = [obj.min, obj.q1, obj.median, obj.q3, obj.max];
        return obj;
      },
    });

    const scale = {
      Districts: {
        alias: "Districts", 
      },
      BVAPPercentage: {
        alias: percentage,
        min: 0,
        max: 1,
        nice: true
      },
      range: {
        alias: minorities,
        min: 0,
        max: 1,
        nice: true
      }
    };

    //-------------------------------------------------------------------
    const columns = [
      {
        title: 'District ID',
        dataIndex: 'ID',
      },
      {
        title: 'Population',
        dataIndex: 'Population',
      },
      {
        title: 'Population Variation',
        dataIndex: 'Variation',
      },
      {
        title: 'Compactness',
        dataIndex: 'Compactness',
      },
    ];
    const data = [
    ];


    //--------------------------------------------------------------------

    return (
      <div>
      <Chart
        height={500}
        data={dv.rows}
        autoFit
        scale={scale}
        padding="auto"
      >
        
        <Axis name="Districts" position="bottom" title />
        <Axis name="BVAPPercentage" position="left" title />
        <Axis name="range" position="right" title />

        <Tooltip
          showTitle={false}
          showMarkers={false}
          itemTpl={
            '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            "{name}<br/>" +
            '<span style="padding-left: 16px">max: {max}</span><br/>' +
            '<span style="padding-left: 16px">q3: {q3}</span><br/>' +
            '<span style="padding-left: 16px">median: {median}</span><br/>' +
            '<span style="padding-left: 16px">q1: {q1}</span><br/>' +
            '<span style="padding-left: 16px">min: {min}</span><br/>' +
            "</li>"
          }
        />

        <Point
          position="boxId*BVAPPercentage"
          label={["BVAPPercentage", { style: { fill: 'red' } }]}
          style={{
            fill: "rgb(255, 0, 0)",
          }}
          shape='square'
          tooltip = {false}
        />

        <Schema
          position={"boxId*range"}
          shape="box"
          style={{
            stroke: "#545454",
            fill: "#1890FF",
            fillOpacity: 0.3,
          }}
          tooltip={[
            "boxId*min*q1*median*q3*max",
            (boxId, min, q1, median, q3, max) => {
              return {
                name: boxId,
                min,
                q1,
                median,
                q3,
                max,
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
      <br></br><br></br>
      <h3>Summary</h3>
      <Table columns={columns} dataSource={data} size="middle" />
      </div>
    );
  }
}
