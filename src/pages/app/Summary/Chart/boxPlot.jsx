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
import GA from '../../../../static/georgia_current_districting_withoutGeo.json'
import LA from '../../../../static/louisiana_current_districting_withoutGeo.json'
import MI from '../../../../static/mississippi_current_districting_withoutGeo.json'

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
    if (checkedList.findIndex(element => element === "Enacted") != -1) {
      this.setState({ enacted: true })
    }
    else {
      this.setState({ enacted: false })
    }
  }

  state = {
    logFile: '',
    checkedList: defaultCheckedList,
    extreme: false,
    average: false,
    random: false,
    enacted: false,
  };


  render() {

  
    let newData = this.props.data
    let minID = newData[0].boxId
    newData.forEach(element => {
      element.boxId = (element.boxId - minID + 1).toString()
    });


    const minorities = this.props.minorities.join("+") + " VAP%"
    const percentage = this.props.minorities.join("+") + " VAPPercentage%"

    let black = false
    let amin = false
    let asian = false;
    let white = false;
    let hisp = false;
    let nhpi = false;

    if(this.props.minorities.findIndex(element => element === "HISPANIC") != -1){
      hisp = true
    }
    if(this.props.minorities.findIndex(element => element === "WHITE") != -1){
      white = true
    }
    if(this.props.minorities.findIndex(element => element === "BLACK") != -1){
      black = true
    }
    if(this.props.minorities.findIndex(element => element === "ASIAN") != -1){
      asian = true
    }
    if(this.props.minorities.findIndex(element => element === "NATIVE") != -1){
      amin = true
    }
    if(this.props.minorities.findIndex(element => element === "Native Hawaiian and Pacific Islander") != -1){
      nhpi = true
    }

    
    let currentMap = {}
    if(this.props.Result.jobData.state === "GEORGIA"){
      currentMap = GA
    }
    else if(this.props.Result.jobData.state === "LOUISIANA"){
      currentMap = LA
    }
    else if(this.props.Result.jobData.state === "MISSISSIPPI"){
      currentMap = MI
    }


    let allVap = []
    currentMap.features.forEach(element => {
      let totalvap = 0
      let minorityvap = 0
      totalvap = totalvap+element.properties.VAP
      
      if(black ===true){minorityvap = minorityvap + element.properties.BVAP}
      if(white ===true){minorityvap = minorityvap + element.properties.WVAP}
      if(hisp ===true){minorityvap = minorityvap + element.properties.HVAP}
      if(nhpi ===true){minorityvap = minorityvap + element.properties.NHPIVAP}
      if(asian ===true){minorityvap = minorityvap + element.properties.ASIANVAP}
      if(amin ===true){minorityvap = minorityvap + element.properties.AMINVAP}
      allVap.push(minorityvap/totalvap)
    });

    allVap =allVap.sort((a,b)=>{return a-b})    


    let BVAPPercentages = this.props.demographic
    let extreme = this.props.extreme
    let random = this.props.random


    for (let i = 0; i < newData.length; i++) {
      newData[i]["BVAPPercentage"] = BVAPPercentages[i]
      newData[i]["extreme"] = extreme[i]
      newData[i]["random"] = random[i]
      newData[i]["enacted"] = allVap[i]
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
      enacted: {
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
    const plainOptions = ['Average', 'Extreme', 'Random','Enacted'];

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
        <div className="box" style={{ marginLeft: 70, background: "black", border: "1px solid black" }}></div>
        <div className="box" style={{ marginLeft: 70, background: "blue", border: "1px solid black" }}></div>
        <div className="box" style={{ marginLeft: 70, background: "green", border: "1px solid black" }}></div>

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

          <Geom
            type="point"
            position="boxId*enacted"
            opacity={0.8}
            size={this.state.enacted === true ? 4 : 1}
            tooltip={false}
            shape={"square"}
            color={"green"}
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

          <pre id="contents">{this.props.Result.logfile}</pre>

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