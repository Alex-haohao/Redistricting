import React from 'react';
import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import { Radio } from 'antd';
import { Layout } from 'antd';
const {Content } = Layout;


class Tab2 extends React.Component{

   constructor(){
       super()
    this.state = {
        value: 1,
      };
   }
    
      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    
      render() {
        const radioStyle = {
          display: 'block',
          height: '30px',
          lineHeight: '40px',
          fontSize:'20px'
        };
        const { value } = this.state;
        return (

            <Content>
            <p>Display map by</p>
          <Radio.Group onChange={this.onChange} value={value} size="large" style={{marginLeft:"10px",fontSize:"20px"}}>
            <Radio style={radioStyle} value={"race"} size="large">
            Race
            </Radio>
            <Radio style={radioStyle} value={"population density"} size="large">
            Population density
            </Radio>
            <Radio style={radioStyle} value={"Democratic-Republican"} size="large">
            Democratic-Republican
            </Radio>
          </Radio.Group>
          </Content>
        );
      }
}




const mapDispatchToProps = (dispatch) =>{
    return {
        mapDisplayAction:bindActionCreators(mapDisplayAction,dispatch),

    }
}

const mapStateToProps =(state)=>{
    return{
        Mapstate:state.Mapstate,
        mapDisplay:state.mapDisplay
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tab2) ;