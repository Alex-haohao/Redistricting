import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import * as resultAction from '../../../../actions/resultAction'
import { Card } from 'antd';
import DeleteModal from "../PopUpModel"
// import CancelModal from "../CancelPopUp"
import './style.less'


class ResultBox extends React.Component {

    handleChangetoMap = () => {
        this.props.mapDisplayAction.changeMapDisplay({
            isShow: true
        })
    }

    handleChangetoPlot = () => {
        this.props.mapDisplayAction.changeMapDisplay({
            isShow: false
        })
    }

    changeCurrentRes = (e) => {
        e.stopPropagation()
        this.props.resultAction.changeCurrentResult({
            jobid: this.props.data.jobId
        })
        this.props.mapDisplayAction.changeMapDisplay({
            isShow: this.props.MapDisplay.isShow,
            display: this.props.MapDisplay.display,
            sidemenu: "3"
        })
    }

    handleDelete = () => {

    }


    render() {
        return (
            <Card
                title="Job detail" onClick={this.changeCurrentRes.bind(this)}
                hoverable
                 extra={
                    <DeleteModal onClick={e =>{e.stopPropagation()}}
                     jobid = {this.props.data.jobId}></DeleteModal> 
                    
                 }
                style={{ width: 300, marginLeft: ' 20px', marginBottom: '20px' }}>
                <p style={{ fontSize: "18px" }}>status: {this.props.data.status}</p>
                <p style={{ fontSize: "18px" }}>Job ID: {this.props.data.jobId}</p>
                <p style={{ fontSize: "18px" }}>State: {this.props.data.state}</p>
                <p style={{ fontSize: "18px" }}>Plan numbers: {this.props.data.numberOfDistrictings}</p>
                <p style={{ fontSize: "18px" }}>Compactness: {this.props.data.compactnessGoal}</p>
                <p style={{ fontSize: "18px" }}>Population Difference: {this.props.data.populationDifference}</p>
            </Card>
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
        MapDisplay: state.MapDisplay
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultBox);