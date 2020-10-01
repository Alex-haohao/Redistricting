import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import * as resultAction from '../../../../actions/resultAction'
import { Card } from 'antd';
import Modal from "../PopUpModel"
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

    changeCurrentRes = () => {
        this.props.resultAction.changeCurrentResult({
            jobid: this.props.data.jobid
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
                title="Job detail" onClick={this.changeCurrentRes}
                hoverable
                 extra={
                    <Modal jobid = {this.props.data.jobid}></Modal> 
                    
                 }
                style={{ width: 300, marginLeft: ' 20px', marginBottom: '20px' }}>
                <p style={{ fontSize: "18px" }}>Job ID: {this.props.data.jobid}</p>
                <p style={{ fontSize: "18px" }}>State: {this.props.data.properties.state}</p>
                <p style={{ fontSize: "18px" }}>Plan numbers: {this.props.data.properties.Plan}</p>
                <p style={{ fontSize: "18px" }}>Compactness: {this.props.data.properties.compactness}</p>
                <p style={{ fontSize: "18px" }}>Minority group: {this.props.data.properties.Minority}</p>
                <p style={{ fontSize: "18px" }}>Population Difference: {this.props.data.properties.PopDiff}</p>

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