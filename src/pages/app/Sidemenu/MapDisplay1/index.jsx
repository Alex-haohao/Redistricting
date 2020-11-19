import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Dropdown, Row, Col, } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import MapDisplay from '../MapDisplay2'
import shortid from 'shortid'
import api from "../../../../api"
import * as mapAction from '../../../../actions/mapAction'
import * as mapDisplayAction from '../../../../actions/mapDisplay'


class MapDisplay1 extends React.Component {

  handleZoomUS = (event) => {
    this.props.mapAction.changeMapState({
      center: [37.8, -96],
      zoom: 4,
      position: "US"
    })
  }

  handleZoomGeorgia = (event) => {
    api.map.getMap("georgia").then(res => res.json())
      .then(data => {
        this.props.mapAction.changeMapState({
          center: [32.69020691781246, -83.58756508528708],
          zoom: 7,
          position: "GA",
          geodata: data,
          geokey: shortid.generate()
        })
      })
  }

  handleZoomLouisiana = (event) => {
    this.props.mapAction.changeMapState({
      center: [30.994275439683353, -92.3121500015259],
      zoom: 7,
      position: "LA"
    })
  }

  handleZoomMississippi = (event) => {
    this.props.mapAction.changeMapState({
      center: [33.07784183741983, -89.70268249511719],
      zoom: 7,
      position: "MS"
    })
  }


  render() {
    const menu = (
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
      >
        <Menu.Item key="1" onClick={this.handleZoomGeorgia}>Georgia</Menu.Item>
        <Menu.Item key="2" onClick={this.handleZoomLouisiana}>Louisiana</Menu.Item>
        <Menu.Item key="3" onClick={this.handleZoomMississippi}>Mississippi</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Row style={{ marginTop: "20px", marginBottom: "50px" }}>
          <Col span={6}></Col>
          <Col span={18}>
            <Dropdown overlay={menu} size="large" >
              <a className="ant-dropdown-link" style={{ fontSize: "24px" }}>
                State selection <DownOutlined />
              </a>
            </Dropdown>
          </Col>
        </Row>
        <MapDisplay></MapDisplay>
      </div>
    )
  }
}




const mapDispatchToProps = (dispatch) => {
  return {
    mapAction: bindActionCreators(mapAction, dispatch),
    mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    Mapstate: state.Mapstate,
    MapDisplay: state.MapDisplay
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay1);