import React from 'react';
import { Layout, Tabs } from 'antd';
import DropdownMenu from "./Dropdown"
import Tab1 from "./Tab1"

const { TabPane } = Tabs;
const { Sider } = Layout;


export default class Sidermenu extends React.Component {



    render() {

        return (



            <Sider className="site-layout-background" width={300}>

                <DropdownMenu></DropdownMenu>


                <Tabs defaultActiveKey="1" centered style={{ "backgroundColor": "white",height:"100%" }}>
                    <TabPane tab="Quick Zoom" key="1">
                        <Tab1></Tab1>
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                     </TabPane>
                </Tabs>






            </Sider>

        )

    }
}