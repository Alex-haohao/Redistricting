import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ResultBox from "./ResultBox"
import api from "../../../api"
import { Button,Modal } from 'antd';
import * as mapAction from '../../../actions/mapAction'
import * as mapDisplayAction from '../../../actions/mapDisplay'

class Result extends React.Component {

  constructor() {
    super()
    this.state = {
      initeData: [],
      message:'',
      visible:false
    };
  }


  handleOk = (e) => {
    e.preventDefault();
    e.stopPropagation()
          this.setState({
            visible: false,
          });
    }
 

  componentWillMount() {
    api.jobs.getJob()
      .then(res => res.json())
      .then(data => {
        this.setState({
          initeData: data
        })
      })
  }

  handleUpdate = (e) =>{
    e.preventDefault();
    e.stopPropagation()

    api.jobs.updateJob()
    .then(res =>res.text())
        .then(data => {
          this.setState({
            visible: true,
            message:data
          })
          this.props.handleCancelCallback()  // also for update the view
      }).then(res =>{
        api.jobs.getCompleted()
        .then(res => {
          console.log(res)
          this.props.handleCancelCallback()  // also for update the view
      })
      }).then(res=>{
        this.props.handleCancelCallback()  // also for update the view
      })
  }

  render() {
    let data = this.props.historyData ? this.props.historyData : this.state.initeData
    console.log(data)
    return (
      <div>
        <Modal
          title="Seawulf Job Queue"
          visible={this.state.visible}
          onOk={this.handleOk}
        >
          <pre id="contents">{this.state.message}</pre>
        </Modal>

          <Button onClick={this.handleUpdate} style={{marginLeft:100,marginBottom:20}}>Update Status</Button>
        {
          data.map((element) => {
            return <ResultBox handleCancelCallback={this.props.handleCancelCallback} data={element} key={element.jobId} />
          })
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mapAction: bindActionCreators(mapAction, dispatch),
    mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {
    Mapstate: state.Mapstate,
    MapDisplay: state.MapDisplay,
    TotalResult: state.TotalResult,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);