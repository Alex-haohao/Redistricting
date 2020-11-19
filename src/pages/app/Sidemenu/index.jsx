import React from 'react';
import { Layout, Tabs } from 'antd';
import MapDisplay from "./MapDisplay1"
import GeneratePlan from "./GeneratePlan"

const { TabPane } = Tabs;
const { Sider } = Layout;

export default class Sidermenu extends React.Component {
    render() {
        return (
            <Sider className="site-layout-background" width={340}>
                <Tabs defaultActiveKey="1" centered style={{ "backgroundColor": "white", height: "100%" }} >
                    <TabPane tab="Map Display" key="1">
                        <MapDisplay></MapDisplay>
                    </TabPane>
                    <TabPane tab="Generate Plan" key="2" >
                        <GeneratePlan></GeneratePlan>
                    </TabPane>
                </Tabs>
            </Sider>
        )
    }
}