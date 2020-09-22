import React from "react"
import Header from '../app/HomeHeader'
import { Layout, Row, Col } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

import Alexpic from '../../static/asuka.jpg'
const { Footer, Content } = Layout;



export default class Aboutus extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header></Header>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={18}>
                            <Content style={{ padding: '0 24px', minHeight: '90vh', fontSize: 30 }}>

                                <Divider orientation="left" style={{ fontSize: "30px" }}>
                                    <Avatar size={64} style={{ margin: '24px 24px' }} src={Alexpic} /> Tianhao Xi
                             </Divider>
                                <Content style={{ padding: '0 24px', margin: '0 100px' }}>
                                    I am Tianhao Xi, my work is GUI design.
                             </Content>

                                <Divider orientation="left" style={{ fontSize: "30px" }}>
                                    <Avatar size={64} style={{ margin: '24px 24px' }} icon={<UserOutlined />} /> Yuchen Pu
                             <Content>

                                    </Content>
                                </Divider>

                                <Divider orientation="left" style={{ fontSize: "30px" }}>
                                    <Avatar size={64} style={{ margin: '24px 24px' }} icon={<UserOutlined />} /> Haoyu Lu
                             <Content>

                                    </Content>
                                </Divider>

                                <Divider orientation="left" style={{ fontSize: "30px" }}>
                                    <Avatar size={64} style={{ margin: '24px 24px' }} icon={<UserOutlined />} /> Boren Wang
                             <Content>

                                    </Content>
                                </Divider>


                            </Content>
                        </Col>
                        <Col span={3}></Col>
                    </Row>
                    <Footer style={{ textAlign: 'center' }}>CSE416 Team Seahawks</Footer>
                </Layout>

            </div>
        )
    }
}