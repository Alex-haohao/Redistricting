import React from "react"
import Header from '../app/HomeHeader'
import { Layout, Row, Col } from 'antd';
import { Collapse } from 'antd';
import './style.less'

const { Panel } = Collapse;
const { Footer, Content } = Layout;


export default class SourcePage extends React.Component {



    render() {
        return (
            <div>
                <Layout>
                    <Header></Header>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={18}>
                            <Content style={{ padding: '0 24px', minHeight: '90vh'}}>

                                <Collapse defaultActiveKey={['1', '2', '3']} >
                                    <Panel header="GUI resource" key="1">
                                        <p>Javascript:   <a href="https://www.javascript.com/">https://www.javascript.com/</a></p>
                                        <p>React:   <a href="https://reactjs.org/">https://reactjs.org/</a></p>
                                        <p>Redux:   <a href="https://redux.js.org/">https://redux.js.org/</a></p>
                                        <p>Webpack:   <a href="https://webpack.js.org/">https://webpack.js.org/</a></p>
                                        <p>npm:   <a href="https://www.npmjs.com/">https://www.npmjs.com/</a></p>
                                        {/* <p>antd:   <a href="https://ant.design/">https://ant.design/</a></p> */}
                                    </Panel>
                                    <Panel header="Server Source" key="2">
                                        <p>JAVA</p>
                                    </Panel>
                                    <Panel header="Data Preprocessing Source" key="3">
                                        <p>Python</p>
                                    </Panel>
                                </Collapse>

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