import React from 'react';
import { Layout, Tabs, Button } from 'antd';
import MapControl from "../Configuration"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapDisplayAction from '../../../actions/mapDisplay'
import * as mapAction from '../../../actions/mapAction'
import Summary from "../Summary/index"
import History from "../History"
import api from "../../../api"
import stateGeoData from "../../../static/stateGeoJson"
const { TabPane } = Tabs;
const { Sider } = Layout;

class Configuration extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      historyData: []
    }
  }

  handleCancelCallback = () => {
    api.jobs.getJob()
      .then(res => res.json())
      .then(data => {
        this.setState({
          historyData: data
        })
      })
  }

  handleChangetoMap = () => {
    this.props.mapDisplayAction.changeMapDisplay({
      isShow: true,
    })
    this.props.mapAction.changeMapState({
      center: [37.8, -96],
      zoom: 4,
      position: "US",
      geodata: stateGeoData
    })
  }

  handleChangetoPlot = () => {
    this.props.mapDisplayAction.changeMapDisplay({
      isShow: false
    })
  }

  render() {
    return (
      <Sider className="site-layout-background" width={340}>
        {this.props.MapDisplay.isShow === false ? <Button type="primary" style={{ width: "100%" }} onClick={this.handleChangetoMap}>Back to Map</Button>: null}
        
        <Tabs
          activeKey={this.props.MapDisplay.sidemenu.toString()}
          onChange={key => {
            this.props.mapDisplayAction.changeMapDisplay({
              isShow: this.props.MapDisplay.isShow,
              display: this.props.MapDisplay.display,
              sidemenu: key
            })

            api.jobs.getJob()
              .then(res => res.json())
              .then(data => {
                this.setState({
                  historyData: data
                })
              })
          }
          }

          type="card" centered style={{ "backgroundColor": "white", height: "100%", maxHeight: "100vh", overflow: "scroll" }}>
          <TabPane tab="Configuration" key="1"  >
            <MapControl></MapControl>
          </TabPane>
          <TabPane tab="History" key="2" >
            {this.state.historyData.length != 0 ? <History handleCancelCallback={this.handleCancelCallback} historyData={this.state.historyData}></History> : null}
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
    mapAction: bindActionCreators(mapAction, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    MapDisplay: state.MapDisplay
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);