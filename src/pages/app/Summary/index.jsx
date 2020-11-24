import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapDisplayAction from '../../../actions/mapDisplay'
import * as resultAction from '../../../actions/resultAction'
import { Card ,Checkbox} from 'antd';
import './style.less';

const { Meta } = Card;
const CheckboxGroup = Checkbox.Group;

const defaultCheckedList = [];


class Summary extends React.Component {

  constructor() {
    super()
    this.state = {
       checkedList: defaultCheckedList,
    };
}
  

onChange = checkedList => {
  this.setState({
    checkedList
  });
};

  handleChangetoMap = () => {
    this.props.mapDisplayAction.changeMapDisplay({
      isShow: true
    })
  }

  handleChangetoPlot = () => {
    if (this.props.Result.jobid !== -1) {
      this.props.mapDisplayAction.changeMapDisplay({
        isShow: false,
        sidemenu: "3",
        display: this.props.MapDisplay.display,
      })
    }
  }

  render() {
    const plainOptions = ['Average', 'Extreme', 'Random'];

    let jobid = this.props.Result.jobid !== -1 ? "Summary of JobID: " + this.props.Result.jobid : "Did not choose any job"
    return (
      <div>
        <Card
          hoverable
          style={{ width: 260, marginLeft: 40 }}
          onClick={this.handleChangetoPlot}
          cover={<img alt="Box-plot" src="http://bizcharts-resource.oss-cn-zhangjiakou.aliyuncs.com/images/5043cf20-afa4-11ea-8765-9d54391a91b0.png" />}
        >
          <Meta title={jobid} description="Click card to Show box plot" />
        </Card>
        <br />
        <br />

      <span style={{fontSize:25,marginLeft:50}}>Districting Plan:</span>

      <br />
        <br />
        <CheckboxGroup 
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
    resultAction: bindActionCreators(resultAction, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    MapDisplay: state.MapDisplay,
    Result: state.Result
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);