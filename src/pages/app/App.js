import React from 'react';
import './App.less';

import { Layout, Menu, Breadcrumb,Row, Col  } from 'antd';
import Header from './HomeHeader'
import Map from '../map'

const {Footer, Sider, Content } = Layout;


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
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
          </Menu>
        </Sider>
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
