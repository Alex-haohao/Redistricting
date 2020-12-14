import React from "react";
import { connect } from 'react-redux'
import {
  Chart,
  Tooltip,
  Schema,
  Interaction,
  Annotation,
  Geom,
  Axis,
  Legend,
} from "bizcharts";
import { DataView } from "@antv/data-set";
import { Card, Checkbox } from 'antd';
import api from '../../../../api'
const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [];

class Demo extends React.Component {
  onChange = checkedList => {
    this.setState({
      checkedList
    });
    if (checkedList.findIndex(element => element === "Average") != -1) {
      this.setState({ average: true })
    }
    else {
      this.setState({ average: false })
    }
    if (checkedList.findIndex(element => element === "Random") != -1) {
      this.setState({ random: true })
    }
    else {
      this.setState({ random: false })
    }
    if (checkedList.findIndex(element => element === "Extreme") != -1) {
      this.setState({ extreme: true })
    }
    else {
      this.setState({ extreme: false })
    }
  }

  state = {
    logFile: '',
    checkedList: defaultCheckedList,
    extreme: false,
    average: false,
    random: false,
  };

  componentWillMount() {
    api.jobs.getlog(this.props.Result.jobid).then(res => res.text())
      .then(text => {
        console.log(text)
        this.setState({
          logFile: text
        });
      });
  }


  render() {

    let newData = this.props.data
    let minID = newData[0].boxId
    newData.forEach(element => {
      element.boxId = (element.boxId - minID + 1).toString()
    });


    const minorities = this.props.minorities.join("+") + " VAP%"
    const percentage = this.props.minorities.join("+") + " VAPPercentage%"

    let BVAPPercentages = this.props.demographic
    let extreme = this.props.extreme
    let random = this.props.random

    for (let i = 0; i < newData.length; i++) {
      newData[i]["BVAPPercentage"] = BVAPPercentages[i]
      newData[i]["extreme"] = extreme[i]
      newData[i]["random"] = random[i]
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
      extreme: {
        min: 0,
        max: 1,
        nice: true
      },
      random: {
        min: 0,
        max: 1,
        nice: true
      },
      Districts: {
        alias: "Districts"
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
    const plainOptions = ['Average', 'Extreme', 'Random'];

    let compactName = ""
    if(this.props.Result.jobData.compactnessGoal <= 0.3){
      compactName = 'Least Compactness '
    }
    else if(this.props.Result.jobData.compactnessGoal == 0.4){
      compactName = 'less Compactness'
    }
    else if(this.props.Result.jobData.compactnessGoal == 0.5){
      compactName = 'more Compactness'
    }
    else if(this.props.Result.jobData.compactnessGoal >= 0.6){
      compactName = 'very Compactness'
    }


    return (
      <div style={{ maxHeight: "100vh" }}>
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
        <br></br>
        <div className="box" style={{ marginLeft: 60, background: "red", border: "1px solid black" }}></div>
        <div className="box" style={{ marginLeft: 60, background: "black", border: "1px solid black" }}></div>
        <div className="box" style={{ marginLeft: 60, background: "blue", border: "1px solid black" }}></div>

        <Chart
          height={500}
          data={dv}

          scale={scale}
          padding="auto"
          forceFit
        >

          <Geom
            type="point"
            position="boxId*BVAPPercentage"
            opacity={0.8}
            shape={"square"}
            color={"red"}
            size={this.state.average === true ? 4 : 1}
            tooltip={false}

          />
          <Geom
            type="point"
            position="boxId*extreme"
            opacity={0.8}
            shape={"square"}
            color={"black"}
            size={this.state.extreme === true ? 4 : 1}
            tooltip={false}

          />


          <Geom
            type="point"
            position="boxId*random"
            opacity={0.8}
            size={this.state.random === true ? 4 : 1}
            tooltip={false}
            shape={"square"}
            color={"blue"}
          />

          <Axis name="Districts" position="bottom" title />
          {/* <Axis name="BVAPPercentage" position="left" title /> */}
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

          <Annotation.Region
            start={["min", "0.33"]}
            end={["max", "0.5"]}
            style={{
              fill: "rgb(0, 153, 51)",
            }}
          />
        </Chart>
        <br></br><br></br>
        <h3>Log</h3>

        <Card title="Log summary" style={{ display: "inline-block", width: 600, maxHeight: 350, overflow: "scroll" }}>

          <pre id="contents">{this.state.logFile}</pre>

        </Card>

        <Card title="Job summary" style={{ display: "inline-block", width: 600, maxHeight: 350, overflow: "scroll" }}>

          <p style={{ fontSize: "18px" }}>State: {this.props.Result.jobData.state}</p>
          <p style={{ fontSize: "18px" }}>Plan numbers: {this.props.Result.jobData.numberOfDistrictings}</p>
          <p style={{ fontSize: "18px" }}>Compactness: {compactName}</p>
          <p style={{ fontSize: "18px" }}>Population Difference: {this.props.Result.jobData.populationDifference}</p>

        </Card>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Result: state.Result,
  }
}

export default connect(mapStateToProps)(Demo);