import React from 'react';
import './App.less';

import { Layout, Breadcrumb,Row, Col } from 'antd';

import Header from './HomeHeader'
import Map from '../map'
import SiderMenu from './Sidemenu'

const {Footer, Content } = Layout;


class App extends React.Component{

  

  render(){
    return(
    <Layout>
    <Header></Header>
    <Row>
      <Col span={1}></Col>
      <Col span={21}>
      
    
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <SiderMenu></SiderMenu>

        <Content style={{ padding: '0 24px', minHeight: '90vh' }}><Map></Map></Content>
      </Layout>
    </Content>
    </Col>
    <Col span={1}></Col>
    </Row>
    <Footer style={{ textAlign: 'center' }}>CSE416 Team Seahawks</Footer>
  </Layout>
    )
      
  }
}

export default App;
