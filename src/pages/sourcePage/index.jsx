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
                            <Content style={{ padding: '0 24px', minHeight: '90vh' }}>

                                <Collapse defaultActiveKey={['1', '2', '3']} >
                                    <Panel header="GUI resources" key="1">
                                        <p>Javascript:   <a href="https://www.javascript.com/">https://www.javascript.com/</a></p>
                                        <p>React:   <a href="https://reactjs.org/">https://reactjs.org/</a></p>
                                        <p>Redux:   <a href="https://redux.js.org/">https://redux.js.org/</a></p>
                                        <p>Webpack:   <a href="https://webpack.js.org/">https://webpack.js.org/</a></p>
                                        <p>npm:   <a href="https://www.npmjs.com/">https://www.npmjs.com/</a></p>
                                        {/* <p>antd:   <a href="https://ant.design/">https://ant.design/</a></p> */}
                                    </Panel>
                                    <Panel header="Server" key="2">
                                        <p>JAVA</p>
                                    </Panel>
                                    <Panel header="Data Preprocessing" key="3">
                                        <p>Python</p>
                                    </Panel>
                                    <Panel header="Data References" key="3">
                                        <p> The MIT Election Data Science Lab site attempts to aggregate data from official sites, and also reports on data anomalies. For many states, it contains recent precinct level election result data.</p>
                                        <p>   The Harvard Election Data Archive contains geographic and election result data at the precinct level.</p>
                                        <p>   The Public Mapping Project has many references to background material, as well as links to possible data sources.</p>
                                        <p>   The Open Elections Project</p>
                                        <p>    US Census Bureau</p>
                                        <p>    US Supreme Court Blog for Gill v. Witford. http://www.scotusblog.com/case-files/cases/gill-v-whitford/. Contains links to many documents of interest in the project.</p>
                                        <p>    MGGG (Metric Geometry and Gerrymandering Group)</p>
                                        <p>   The National Historical GIS (NHGIS) contains summary statistics and GIS files for U.S. censuses and other nationwide surveys from 1790 through the present. It also contains state boundary data.</p>
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