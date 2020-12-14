import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import * as resultAction from '../../../../actions/resultAction'
import { Card, Collapse, Button } from 'antd';
import DeleteModal from "../DeleteModal"
import CancelModal from "../CancelPopUp"
import './style.less'
const { Panel } = Collapse;


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
        let demographic = this.props.data.average.districts
        let extremeDemographic = this.props.data.extreme.districts
        let randomDemographic = this.props.data.random.districts

        let temp = [];
        let extremetemp = [];
        let randomtemp = [];

        let averageid = this.props.data.average.districtingId
        let extremeid = this.props.data.extreme.districtingId
        let randomid = this.props.data.random.districtingId

        demographic.forEach(element => {
            temp.push(element.demographics.minoritiesVapPercentage)
        });

        extremeDemographic.forEach(element => {
            extremetemp.push(element.demographics.minoritiesVapPercentage)
        });

        randomDemographic.forEach(element => {
            randomtemp.push(element.demographics.minoritiesVapPercentage)
        });

        this.props.resultAction.changeCurrentResult({
            jobid: this.props.data.jobId,
            boxData: this.props.data.summary,
            minorities: this.props.data.minorities,
            demographic: temp,
            extremeDemographic: extremetemp,
            randomDemographic: randomtemp,
            averageid: averageid,
            extremeid: extremeid,
            randomid: randomid,
            jobData: this.props.data
        })
        this.props.mapDisplayAction.changeMapDisplay({
            isShow: this.props.MapDisplay.isShow,
            display: this.props.MapDisplay.display,
            sidemenu: "3"
        })
    }

    render() {
        let isSummary = (this.props.data.status === "Completed") ? false : true

        let compactName = ""
        if (this.props.data.compactnessGoal <= 0.3) {
            compactName = 'Least Compactness '
        }
        else if (this.props.data.compactnessGoal == 0.4) {
            compactName = 'less Compactness'
        }
        else if (this.props.data.compactnessGoal == 0.5) {
            compactName = 'more Compactness'
        }
        else if (this.props.data.compactnessGoal >= 0.6) {
            compactName = 'very Compactness'
        }
        return (
            <Card
                title="Job detail"
                hoverable
                extra={
                    this.props.data.status === "Completed" ? <div><DeleteModal onClick={e => { e.stopPropagation() }}
                        jobid={this.props.data.jobId}
                        handleCancelCallback={this.props.handleCancelCallback}
                    ></DeleteModal> </div> :
                        <div>
                            <CancelModal onClick={e => { e.stopPropagation() }}
                                jobid={this.props.data.jobId}>
                                handleCancelCallback={this.props.handleCancelCallback}
                            </CancelModal>
                        </div>
                }
                style={{ width: 300, marginLeft: ' 20px', marginBottom: '20px' }}>
                <p style={{ fontSize: "18px" }}>Job ID: {this.props.data.jobId}</p>
                <p style={{ fontSize: "18px" }}>status: {this.props.data.status}</p>
                <Collapse onClick={e => { e.stopPropagation() }}>
                    <Panel header="More detail" key="1">
                        <p style={{ fontSize: "18px" }}>State: {this.props.data.state}</p>
                        <p style={{ fontSize: "18px" }}>Plan numbers: {this.props.data.numberOfDistrictings}</p>
                        <p style={{ fontSize: "18px" }}>Compactness: {this.props.data.compactnessGoal}</p>
                        <p style={{ fontSize: "18px" }}>Population Difference: {this.props.data.populationDifference}</p>
                        <Button type="primary" disabled={isSummary} onClick={this.changeCurrentRes.bind(this)}> Summary </Button>
                    </Panel>
                </Collapse>
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