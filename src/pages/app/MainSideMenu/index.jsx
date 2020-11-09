import React from 'react';
import { Layout, Tabs, Button } from 'antd';
import MapControl from "../Sidemenu"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapDisplayAction from '../../../actions/mapDisplay'
import * as mapAction from '../../../actions/mapAction'

import Summary from "../Summary/index"
import History from "../Result"
import api from "../../../api"
import stateGeoData from "../../../static/stateGeoJson"


const { TabPane } = Tabs;
const { Sider } = Layout;

class Sidermenu extends React.Component {

  constructor() {
    super();
    this.state = {
      jobs: [],
      resData: []
    }
  }

  handleChangetoMap = () => {
    this.props.mapDisplayAction.changeMapDisplay({
      isShow: true,
    })
    this.props.mapAction.changeMapState({
      center: [37.8, -96],
      zoom: 4,
      position: "US",
      geodata:stateGeoData
    })
  }

  handleChangetoPlot = () => {
    this.props.mapDisplayAction.changeMapDisplay({
      isShow: false
    })
  }


  histroyHandler = () => {
    //         api.jobs.getJob()
    //   // .then(res =>res.json())
    //   .then(data => {
    //       // this.setState({
    //       //     jobs:data
    //       // })
    //       console.log(data)

    //   })
    console.log("hahaha")
  }



  render() {
    return (
      <Sider className="site-layout-background" width={340}>
        <Button type="primary" style={{ width: "100%" }} onClick={this.handleChangetoMap}>Back to Map</Button>

        <Tabs
          activeKey={this.props.MapDisplay.sidemenu.toString()}
          onChange={key => {
            if (key == 2) {
              console.log("haah")
              api.jobs.getJob()
                .then(res => res.json())
                .then(data => {
                  this.setState({
                    resData: data
                  })
                })
            }
            

            this.props.mapDisplayAction.changeMapDisplay({
              isShow: this.props.MapDisplay.isShow,
              display: this.props.MapDisplay.display,
              sidemenu: key
            })
          }}

          type="card" centered style={{ "backgroundColor": "white", height: "100%", maxHeight: "100vh", overflow: "scroll" }}>
          <TabPane tab="Configuration" key="1"  >
            <MapControl></MapControl>
          </TabPane>
          <TabPane tab="History" key="2" >

            { this.state.resData.length !=0  ? <History resData = {this.state.resData}></History> : null}
                    </TabPane>
          <TabPane tab="Summary" key="3" >
            <Summary></Summary>
          </TabPane>
        </Tabs>
      </Sider>

    )

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
    mapAction:bindActionCreators(mapAction,dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    MapDisplay: state.MapDisplay
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidermenu);