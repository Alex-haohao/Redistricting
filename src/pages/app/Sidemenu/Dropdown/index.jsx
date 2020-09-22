import React from 'react';
import { Menu, Dropdown} from 'antd';
import { DownOutlined} from '@ant-design/icons';
import './style.less'

export default class DropdownComponent extends React.Component {
  state = {
    visible: false,
  };

  handleMenuClick = e => {
    
      this.setState({ visible: false });
    
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick} >
        <Menu.Item key="1">2013</Menu.Item>
        <Menu.Item key="2">2008</Menu.Item>
        <Menu.Item key="3">2000</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
       
      >
        <a href="./" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Data year <DownOutlined />
        </a>
      </Dropdown>
    );
  }
}

