import React from 'react';
import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as mapDisplayAction from '../../../actions/mapDisplay'
import { Card ,Button} from 'antd';

const { Meta } = Card;

 class Summary extends React.Component {

     handleChangetoMap = ()=>{
        this.props.mapDisplayAction.changeMapDisplay({
            isShow: true
          })
     }

     handleChangetoPlot =()=>{
        this.props.mapDisplayAction.changeMapDisplay({
            isShow: false
          })
     }


    render() {
        return (
            <Card
            hoverable
            style={{ width: 260,marginLeft:20 }}
            onClick={this.handleChangetoPlot}
            cover={<img alt="Box-plot" src="http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/5043cf20-afa4-11ea-8765-9d54391a91b0.png" />}
          >
            <Meta title="Box plot" description="Click card to Show box plot" />
          </Card>
        )

    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
      mapDisplayAction:bindActionCreators(mapDisplayAction,dispatch),
  
    }
  }
  
  const mapStateToProps =(state)=>{
    return{
      MapDisplay:state.MapDisplay
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Summary) ;