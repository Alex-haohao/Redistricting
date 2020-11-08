import React from 'react';
import { Descriptions} from 'antd';


export default class Description extends React.Component {

    state = {
        size: 'default',
      };
    
      onChange = e => {
        console.log('size checked', e.target.value);
        this.setState({
          size: e.target.value,
        });
      };
    

    render() {
        return (
          <div>
            <Descriptions
              style = {{opacity :this.props.opacity, }}
              bordered = {true}
              size={this.state.size}
            >
              <Descriptions.Item label="Info" >
                Population /sqmi: {this.props.descriptionInfo.State_Land}  
                <br />
                State name: {this.props.descriptionInfo.State_Name}
                <br />
               
              </Descriptions.Item>
            </Descriptions>
          </div>
        );
      }
    }

