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
                Precinct name: {this.props.descriptionInfo.PRECINCT_N}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number of votes for  Democratic presidential candidate: {this.props.descriptionInfo.PRES16D}
                <br />
                Number of votes for Republican presidential candidate:{this.props.descriptionInfo.PRES16R}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Number of votes for Libertarian presidential candidate: {this.props.descriptionInfo.PRES16L}
                <br />
                Number of votes for Democratic senate candidate:{this.props.descriptionInfo.SEN16D}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of votes for Republican senate candidate:{this.props.descriptionInfo.SEN16R}
                <br />
                Number of votes for Libertarian senate candidate:{this.props.descriptionInfo.SEN16L}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total population:{this.props.descriptionInfo.TOTPOP}
                <br />
                Total voting age population:{this.props.descriptionInfo.VAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hispanic voting age population:{this.props.descriptionInfo.HVAP}
                <br />
                White, non-hispanic, voting age population:{this.props.descriptionInfo.WVAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black, non-hispanic, voting age population:{this.props.descriptionInfo.BVAP}
                <br/>
                Asian, non-hispanic, voting age population:{this.props.descriptionInfo.ASIANVAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;American Indian and Alaska Native, non-hispanic, voting age population:{this.props.descriptionInfo.AMINVAP}
                <br />
                Native Hawaiian and Pacific Islander, non-hispanic, voting age population:{this.props.descriptionInfo.NHPIVAP}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other race, non-hispanic, voting age population:{this.props.descriptionInfo.OTHERVAP}
                <br />
              </Descriptions.Item>
            </Descriptions>
          </div>
        );
      }
    }

