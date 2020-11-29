import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapDisplayAction from '../../../actions/mapDisplay'
import * as resultAction from '../../../actions/resultAction'
import * as averageLayerDisplay from '../../../actions/averageLayerDisplay'
import * as extremeLayerDisplay from '../../../actions/extremeLayerDisplay'
import * as randomLayerDisplay from '../../../actions/randomLayerDisplay'
import { Card, Checkbox,Button } from 'antd';
import './style.less';
import shortid from 'shortid'
import randomPlan from '../../../static/GA_random.json'
import averagePlan from '../../../static/GA_average.json'
import extremePlan from '../../../static/GA_extreme.json'

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

    if (checkedList.findIndex(element => element === "Average") != -1) {
      this.props.averageLayerDisplay.changeMapDisplay({
        averageGeodata: averagePlan,
        jobid: shortid.generate()
      })
    }
    else {
      this.props.averageLayerDisplay.changeMapDisplay({
        averageGeodata: "",
        jobid: shortid.generate()
      })
    }

    if (checkedList.findIndex(element => element === "Extreme") != -1) {
      this.props.extremeLayerDisplay.changeMapDisplay({
        extremeGeodata: extremePlan,
        jobid: shortid.generate()
      })
    }
    else {
      this.props.extremeLayerDisplay.changeMapDisplay({
        extremeGeodata: "",
        jobid: shortid.generate()
      })
    }

    if (checkedList.findIndex(element => element === "Random") != -1) {
      this.props.randomLayerDisplay.changeMapDisplay({
        randomGeodata: randomPlan,
        jobid: shortid.generate()
      })
    }
    else {
      this.props.randomLayerDisplay.changeMapDisplay({
        randomGeodata: "",
        jobid: shortid.generate()
      })
    }

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

  handleDownloadClick = (e) =>{
    // window.open(`/react/get/downloadPdf?id=${this.props.id}&name=${this.props.name}`)
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

        <span style={{ fontSize: 25, marginLeft: 50 }}>Districting Plan:</span>

        <br />
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
        <br />
        <br />

        <br />
        <br />

        <span style={{ fontSize: 25, marginLeft: 30 }}>Download Districting Plan</span>
        <br />
        <Button
        style={{marginLeft: 100 }}
          onClick={this.handleDownloadClick}
        >
          Download
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
    resultAction: bindActionCreators(resultAction, dispatch),
    averageLayerDisplay: bindActionCreators(averageLayerDisplay, dispatch),
    extremeLayerDisplay: bindActionCreators(extremeLayerDisplay, dispatch),
    randomLayerDisplay: bindActionCreators(randomLayerDisplay, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    MapDisplay: state.MapDisplay,
    Result: state.Result,
    AverageLayerDisplay: state.AverageLayerDisplay,
    ExtremeLayerDisplay: state.ExtremeLayerDisplay,
    RandomLayerDisplay: state.RandomLayerDisplay,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);