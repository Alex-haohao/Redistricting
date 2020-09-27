import React from 'react';
import { Layout, Tabs,Button } from 'antd';
import MapControl from "../Sidemenu"
import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as mapDisplayAction from '../../../actions/mapDisplay'
import Summary from "../Summary/index"

const { TabPane } = Tabs;
const { Sider } = Layout;


 class Sidermenu extends React.Component {

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
            <Sider className="site-layout-background" width={305}>
                <Button type="primary" style={{width:"100%"}} onClick={this.handleChangetoMap}>Back to Map</Button>

                <Tabs defaultActiveKey="1" type="card" centered style={{ "backgroundColor": "white",height:"100%" }}>
                    <TabPane tab="Map Control" key="1" >
                        <MapControl></MapControl>
                    </TabPane>
                    <TabPane tab="SeaWulf" key="2" >
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Summary" key="3" >
                        <Summary></Summary>
                     </TabPane>
                </Tabs>
            </Sider>

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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Sidermenu) ;