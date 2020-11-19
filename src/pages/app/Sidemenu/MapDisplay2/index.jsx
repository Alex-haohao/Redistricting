import React from 'react';
import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as mapAction from '../../../../actions/mapAction'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import { Radio } from 'antd';
import { Layout,Button } from 'antd';
import stateGeoData from '../../../../static/stateGeoJson'
import shortid from "shortid"
const {Content } = Layout;


class Tab2 extends React.Component{
   constructor(){
       super()
    this.state = {
        colorvalue: "default",
        levelvalue: 1,
      };
   }
    
      colorOnChange = e => {
        this.setState({
          colorvalue: e.target.value,
        });

        this.props.mapDisplayAction.changeMapDisplay({
          display: e.target.value,
          isShow : true
        })

        this.props.mapAction.changeMapState({
          center: this.props.Mapstate.center,
          zoom: 7,
          position:this.props.Mapstate.position,
          geodata: this.props.Mapstate.geodata,
          geokey : shortid.generate()
        })

      };

      levelOnChange = e => {
        this.setState({
          levelvalue: e.target.value,
        });
      };

      handleReset = (event)=>{
        this.props.mapAction.changeMapState({
            center: [37.8, -96],
            zoom: 4,
            position:"US",
            geodata:stateGeoData
          })
          
          this.props.mapDisplayAction.changeMapDisplay({
            display: "default",
            isShow : true
          })

        this.setState({
            colorvalue:0,
            levelvalue:0
        })
    }
    
      render() {
        const radioStyle = {
          display: 'block',
          height: '30px',
          lineHeight: '40px',
          fontSize:'20px'
        };
        const { colorvalue,levelvalue } = this.state;
        return (

            <Content>
            <Button onClick={this.handleReset} style={{width:"100%",marginBottom:"20px"}}>Reset</Button>
   

            <p style={{marginLeft:"10px",fontSize:"20px"}}> Display map by population density</p>
          <Radio.Group onChange={this.colorOnChange}  value={colorvalue} size="large" style={{marginLeft:"10px",fontSize:"20px"}}
          >
          <Radio style={radioStyle} value={"default"} size="large">
          default 
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
            <Radio style={radioStyle} value={"otherDensity"} size="large">
            Other race
            </Radio>
          </Radio.Group>

            <br/><br/><br/>
          <p style={{marginLeft:"10px",fontSize:"20px"}}>Filter Boundary </p>
          <Radio.Group onChange={this.levelOnChange} value={levelvalue} size="large" style={{marginLeft:"10px",fontSize:"20px"}}>
            <Radio style={radioStyle} value={"district"} size="large">
            District
            </Radio>
            <Radio style={radioStyle} value={"precinct"} size="large">
            Precinct
            </Radio>
            
          </Radio.Group>
          </Content>
        );
      }
}




const mapDispatchToProps = (dispatch) =>{
    return {
        mapDisplayAction:bindActionCreators(mapDisplayAction,dispatch),
        mapAction:bindActionCreators(mapAction,dispatch),
    }
}

const mapStateToProps =(state)=>{
    return{
        Mapstate:state.Mapstate,
        MapDisplay:state.MapDisplay
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tab2) ;