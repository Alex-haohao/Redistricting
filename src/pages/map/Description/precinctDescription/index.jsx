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
              style = {{opacity :this.props.opacity}}
              bordered = {true}
              size={this.state.size}
              column = {4}
            >
              <Descriptions.Item  label="Total population:" >
              {String(this.props.descriptionInfo.TOTPOP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item  label="White population:" >
                {String(this.props.descriptionInfo.WHITE).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item  label="African American population:" >
                {String(this.props.descriptionInfo.BLACK).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item  label="Hispanic population:" >
                {String(this.props.descriptionInfo.HISP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item  label="Asian population:" >
                {String(this.props.descriptionInfo.ASIAN).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item  label="American Indian population:" >
                {String(this.props.descriptionInfo.AMIN).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item  label="Total VAP:" >
                {String(this.props.descriptionInfo.VAP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item label="Hispanic VAP:" >
                {String(this.props.descriptionInfo.HVAP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item label="White VAP:" >
              {String(this.props.descriptionInfo.WVAP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item label="African American VAP:" >
              {String(this.props.descriptionInfo.BVAP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item label="Asian voting VAP:" >
              {String(this.props.descriptionInfo.ASIANVAP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
              <Descriptions.Item label="American Indian VAP:" >
              {String(this.props.descriptionInfo.AMINVAP).replace(/(.)(?=(\d{3})+$)/g,'$1,')}
              </Descriptions.Item>
            </Descriptions>
          </div>
        );
      }
    }

