import React from 'react';
import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as mapAction from '../../../../actions/mapAction'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import { Radio } from 'antd';
import { Layout,Button } from 'antd';
const {Content } = Layout;


class Tab2 extends React.Component{

   constructor(){
       super()
    this.state = {
        colorvalue: 1,
        levelvalue: 1,
      };
   }
    
      colorOnChange = e => {
        this.setState({
          colorvalue: e.target.value,
        });
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
            position:"US"
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
   

            <p style={{marginLeft:"10px",fontSize:"20px"}}> Display map by</p>
          <Radio.Group onChange={this.colorOnChange} value={colorvalue} size="large" style={{marginLeft:"10px",fontSize:"20px"}}>
            <Radio style={radioStyle} value={"WhiteDensity"} size="large">
            white population density  
            </Radio>
            <Radio style={radioStyle} value={"AsianDensity"} size="large">
            Asian population density  
            </Radio>
            <Radio style={radioStyle} value={"AfricanAmericandensity"} size="large">
            Black population density  
            </Radio>
            <Radio style={radioStyle} value={"AmericanIndian"} size="large">
            American Indian Population density
            </Radio>
            <Radio style={radioStyle} value={"populationDensity"} size="large">
            Total Population density
            </Radio>
            <Radio style={radioStyle} value={"DemocraticRepublican"} size="large">
            Democratic-Republican
            </Radio>
          </Radio.Group>

            <br/><br/><br/>
          <p style={{marginLeft:"10px",fontSize:"20px"}}>Level</p>
          <Radio.Group onChange={this.levelOnChange} value={levelvalue} size="large" style={{marginLeft:"10px",fontSize:"20px"}}>
            <Radio style={radioStyle} value={"district"} size="large">
            district
            </Radio>
            <Radio style={radioStyle} value={"precinct"} size="large">
            precinct
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