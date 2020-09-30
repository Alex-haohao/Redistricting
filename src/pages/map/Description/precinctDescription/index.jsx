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
                Total voting age population:{this.props.descriptionInfo.VAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hispanic voting age population:{this.props.descriptionInfo.HVAP}
                <br />
                White voting age population:{this.props.descriptionInfo.WVAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black voting age population:{this.props.descriptionInfo.BVAP}
                <br/>
                Asian voting age population:{this.props.descriptionInfo.ASIANVAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;American Indian and Alaska Native voting age population:{this.props.descriptionInfo.AMINVAP}
                <br />
                Native Hawaiian and Pacific Islander voting age population:{this.props.descriptionInfo.NHPIVAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other race voting age population:{this.props.descriptionInfo.OTHERVAP}
                <br />
              </Descriptions.Item>
            </Descriptions>
          </div>
        );
      }
    }

