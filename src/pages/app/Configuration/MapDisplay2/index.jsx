import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapAction from '../../../../actions/mapAction'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import { Radio } from 'antd';
import { Row, Col, Layout, Button,Checkbox } from 'antd';
import stateGeoData from '../../../../static/stateGeoJson'
import shortid from "shortid"
import api from "../../../../api"
import './style.less'

const { Content } = Layout;


class MapDisplay2 extends React.Component {
  constructor() {
    super()
    this.state = {
      colorvalue: "default",
      levelvalue: 1,
      isprecicnt: false,
      isdistrict: false
    };
  }

  colorOnChange = e => {
    this.setState({
      colorvalue: e.target.value,
    });

    this.props.mapDisplayAction.changeMapDisplay({
      display: e.target.value,
      isShow: true
    })

    this.props.mapAction.changeMapState({
      center: this.props.Mapstate.center,
      zoom: 7,
      position: this.props.Mapstate.position,
      geodata: this.props.Mapstate.geodata,
      districtgeodata: this.props.Mapstate.districtgeodata,
      geokey: shortid.generate()
    })

  };

  onDistrctChange= e=>{
    this.setState({
      isdistrict: e.target.checked,
    });
    if(e.target.checked ==true){
      if (this.props.Mapstate.position !== 'US') {
        let stateName = ""
        if (this.props.Mapstate.position === 'GA') {
          stateName = "georgia/districting"
        }
        else if (this.props.Mapstate.position === 'LA') {
          stateName = "louisiana/districting"
        }
        else if (this.props.Mapstate.position === 'MI') {
          stateName = "mississippi/districting"
        }

        api.map.getMap(stateName).then(res => res.json())
          .then(data => {
            this.props.mapAction.changeMapState({
              center: this.props.Mapstate.center,
              zoom: this.props.Mapstate.zoom,
              position: this.props.Mapstate.position,
              geodata: this.props.Mapstate.geodata,
              districtgeodata: data,
              geokey: shortid.generate()
            })
          })
      }
    }
    else{
        this.props.mapAction.changeMapState({
          center: this.props.Mapstate.center,
          zoom: this.props.Mapstate.zoom,
          position: this.props.Mapstate.position,
          geodata: this.props.Mapstate.geodata,
          districtgeodata: '',
          geokey: shortid.generate()
        })
    }
  }


  onPrecinctChange= e=>{
    this.setState({
      isprecicnt: e.target.checked,
    });
    console.log(e.target.checked)
    if(e.target.checked ==true){
      if (this.props.Mapstate.position !== 'US') {
        let stateName = ""
        if (this.props.Mapstate.position === 'GA') {
          stateName = "georgia"
        }
        else if (this.props.Mapstate.position === 'LA') {
          stateName = "louisiana"
        }
        else if (this.props.Mapstate.position === 'MI') {
          stateName = "mississippi"
        }

        api.map.getMap(stateName).then(res => res.json())
          .then(data => {
            this.props.mapAction.changeMapState({
              center: this.props.Mapstate.center,
              zoom: this.props.Mapstate.zoom,
              position: this.props.Mapstate.position,
              geodata: data,
              districtgeodata: this.props.Mapstate.districtgeodata,
              geokey: shortid.generate()
            })
          })
      }
    }
    else{
        this.props.mapAction.changeMapState({
          center: this.props.Mapstate.center,
          zoom: this.props.Mapstate.zoom,
          position: this.props.Mapstate.position,
          geodata: '',
          districtgeodata: this.props.Mapstate.districtgeodata,
          geokey: shortid.generate()
        })
    }
  }


  levelOnChange = e => {
    this.setState({
      levelvalue: e.target.value,
    });

    if (e.target.value === 'district') {

      if (this.props.Mapstate.position !== 'US') {
        let stateName = ""
        if (this.props.Mapstate.position === 'GA') {
          stateName = "georgia/districting"
        }
        else if (this.props.Mapstate.position === 'LA') {
          stateName = "louisiana/districting"
        }
        else if (this.props.Mapstate.position === 'MI') {
          stateName = "mississippi/districting"
        }

        api.map.getMap(stateName).then(res => res.json())
          .then(data => {
            this.props.mapAction.changeMapState({
              center: this.props.Mapstate.center,
              zoom: this.props.Mapstate.zoom,
              position: this.props.Mapstate.position,
              geodata: data,
              geokey: shortid.generate()
            })
          })
      }
    }

    else if (e.target.value === 'precinct') {

      if (this.props.Mapstate.position !== 'US') {
        let stateName = ""
        if (this.props.Mapstate.position === 'GA') {
          stateName = "georgia"
        }
        else if (this.props.Mapstate.position === 'LA') {
          stateName = "louisiana"
        }
        else if (this.props.Mapstate.position === 'MI') {
          stateName = "mississippi"
        }

        api.map.getMap(stateName).then(res => res.json())
          .then(data => {
            this.props.mapAction.changeMapState({
              center: this.props.Mapstate.center,
              zoom: this.props.Mapstate.zoom,
              position: this.props.Mapstate.position,
              geodata: data,
              geokey: shortid.generate()
            })
          })
      }
    }
  };

  handleReset = (event) => {
    this.props.mapAction.changeMapState({
      center: [37.8, -96],
      zoom: 4,
      position: "US",
      geodata: stateGeoData,
      districtgeodata: ''
    })

    this.props.mapDisplayAction.changeMapDisplay({
      display: "default",
      isShow: true
    })

    this.setState({
      colorvalue: 0,
      levelvalue: 0
    })
  }

  
  render() {
    let distrcitchecked = this.props.Mapstate.districtgeodata !='' ? true : false
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '40px',
      fontSize: '20px'
    };
    const { colorvalue, levelvalue } = this.state;

    let currentMode = false    
    if (this.state.isprecicnt === false && this.state.isdistrict === false) {
      currentMode = false
    }
    else{
      currentMode = true
    }

    let filtermode = true
    if (this.props.Mapstate.position !=="US") {
      filtermode = false
    }

    return (

      <Content>
        <Row>
          <Col span={7}></Col>
          <Col span={9}>
            <Button onClick={this.handleReset} style={{ width: "80%", marginBottom: "20px" }}>Reset</Button>
          </Col>
        </Row>
        <p style={{ marginLeft: "10px", fontSize: "20px" }}> Display map by population density</p>
        <Radio.Group disabled={!currentMode} onChange={this.colorOnChange} value={colorvalue} size="large" style={{ marginLeft: "10px", fontSize: "20px" }}
        >
          <Radio style={radioStyle} value={"default"} size="large">
            Default
            </Radio>
          <Radio style={radioStyle} value={"WhiteDensity"} size="large">
            White
            </Radio>
          <Radio style={radioStyle} value={"AsianDensity"} size="large">
            Asian
            </Radio>
          <Radio style={radioStyle} value={"AfricanAmericandensity"} size="large">
            Black
            </Radio>
          <Radio style={radioStyle} value={"AmericanIndian"} size="large">
            American Indian
            </Radio>

        </Radio.Group>

        <br /><br /><br />
        <p style={{ marginLeft: "10px", fontSize: "20px" }}>Filter Boundary </p>
        {/* <Radio.Group disabled={filtermode} onChange={this.levelOnChange} value={levelvalue} size="large" style={{ marginLeft: "10px", fontSize: "20px" }}>
          <Radio style={radioStyle} value={"district"} size="large">
            District
            </Radio>
          <Radio style={radioStyle} value={"precinct"} size="large">
            Precinct
            </Radio>
        </Radio.Group> */}

        <Checkbox disabled={filtermode} checked={distrcitchecked} onChange={this.onDistrctChange}>District</Checkbox>
        <Checkbox disabled={filtermode} onChange={this.onPrecinctChange}>Precinct</Checkbox>

        <br /><br /><br />

        {this.props.MapDisplay.display === "default" ? null : <Row>
          <Col span={3}></Col>
          <Col span={9}>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,100%,50%)"}}></div> {"  >"} 90%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,90%,50%)"}}></div> {"  >"} 70%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,80%,50%)"}}></div>{"  >"} 50%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,70%,50%)"}}></div>{"  ="} 30%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,60%,50%)"}}></div>{"  ="} 10%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,50%,50%)"}}></div>{"  ="} 0%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,40%,50%)"}}></div>{"  ="} -10%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,30%,50%)"}}></div>{"  ="} -30%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,20%,50%)"}}></div>{"  ="} -50%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,10%,50%)"}}></div>{"  <"} -70%</p>
          <p style={{fontSize : "16px",lineHeight:1}}> <div className="box" style={{background:"hsl(150,0%,50%)"}}></div>{"  <"} -90%</p>
          </Col>
        </Row>}
        
       
      </Content>
    );
  }
}




const mapDispatchToProps = (dispatch) => {
  return {
    mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
    mapAction: bindActionCreators(mapAction, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    Mapstate: state.Mapstate,
    MapDisplay: state.MapDisplay
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay2);