import React from 'react';
import { Layout, Tabs } from 'antd';
import Tab1 from "./Tab1"
import Tab3 from "./Tab3"

const { TabPane } = Tabs;
const { Sider } = Layout;


export default class Sidermenu extends React.Component {



    render() {

        return (



            <Sider className="site-layout-background" width={340}>



                <Tabs defaultActiveKey="1" centered style={{ "backgroundColor": "white",height:"100%" }}>
                    <TabPane tab="Map Display" key="1">
                        <Tab1></Tab1>
                    </TabPane>
                    <TabPane tab="Generate Plan" key="2">
                        <Tab3></Tab3>
                    </TabPane>
                </Tabs>






            </Sider>

        )

    }
}