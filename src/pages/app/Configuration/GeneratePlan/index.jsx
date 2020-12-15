import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapAction from '../../../../actions/mapAction'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import * as PopUpAction from '../../../../actions/showPopUp'
import { InputNumber } from 'antd';
import { Select, Layout, Slider, Row, Col, Button, Progress ,Modal} from 'antd';
import { addResult, deleteResult } from '../../../../actions/totalResult'
import api from '../../../../api'

const { Content } = Layout;
const { Option } = Select;

class GeneratePlan extends React.Component {
    constructor() {
        super()
        this.state = {
            StateName: 'GEORGIA',
            PlanNuminputValue: 1,
            PopDiffinputValue: 0,
            CompactnessinputValue: 0,
            MinorityGroup: ['HISPANIC'],
            percent: 0,
            colorvalue: 1,
            levelvalue: 1,
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

    handleStateChange = (value) => {
        this.setState({
            StateName: value,
        });
    }

    handlePlanNumChange = (value) => {
        this.setState({
            PlanNuminputValue: value,
        });
    }

    handlePopDiffChange = (value) => {
        this.setState({
            PopDiffinputValue: value,
        });
    }

    handleCompactnessChange = (value) => {
        this.setState({
            CompactnessinputValue: value,
        });
    }

    handleGroupChange = (value) => {
        console.log(value);
        this.setState({
            MinorityGroup: value,
        });
    }

    PopUpHandler = () => {
        const data = {
            state: this.state.StateName,
            numberOfDistrictings: this.state.PlanNuminputValue,
            populationDifference: this.state.PopDiffinputValue,
            compactnessGoal: this.state.CompactnessinputValue,
            minorities: this.state.MinorityGroup,
        }

        api.jobs.addJob(data).then(res => res.json()
        ).then(data =>{
            this.setState({
                visible: true,
                message:data
              })
        })

        let timer = setInterval(() => {
            let percent = this.state.percent + 20;
            if (percent > 100) {
                percent = 100;
            }
            this.setState({ percent });
            if (this.state.percent === 100) {
                setTimeout(() => {
                    clearInterval(timer);
                    this.setState({ percent: 0 });
                }, 500);
            }
        }, 200);
    }
    
    render() {
        const marks = {
            0.3: 'least',
            0.4: 'less',
            0.5:'more',
            0.6: 'very',
          };

          

        let { PlanNuminputValue, CompactnessinputValue, PopDiffinputValue } = this.state;
        return (
            <Content>
                <span style={{ fontSize: 20, marginLeft: "20px", marginRight: "10px" }}>State Name: </span>
                        <Select defaultValue="GEORGIA" style={{ width: 120 }} onChange={this.handleStateChange}>
                            <Option value="GEORGIA">GEORGIA</Option>
                            <Option value="LOUISIANA">LOUISIANA</Option>
                            <Option value="MISSISSIPPI">MISSISSIPPI</Option>
                        </Select>
                        <br /><br /><br />

                <span style={{ fontSize: 20, marginLeft: "20px", marginRight: "10px" }}>Plan Numbers: </span>
                <InputNumber size="large" min={1} max={5000} value={PlanNuminputValue} onChange={this.handlePlanNumChange} />
                    <br />
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <Slider
                            min={1}
                            max={5000}
                            onChange={this.handlePlanNumChange}
                            value={typeof PlanNuminputValue === 'number' ? PlanNuminputValue : 0}
                        />
                    </Col>
                </Row>
                <br />

                <span style={{ fontSize: 20, marginLeft: "20px", marginRight: "10px" }}>Population Difference: </span>
                <InputNumber size="large" min={0} max={1} value={PopDiffinputValue} onChange={this.handlePopDiffChange} />
                <br />
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <Slider
                        step={0.01}
                            min={0}
                            max={1}
                            onChange={this.handlePopDiffChange}
                            value={typeof PopDiffinputValue === 'number' ? PopDiffinputValue : 0}
                        />
                    </Col>
                </Row>
                <br />

                <span style={{ fontSize: 20, marginLeft: "20px", marginRight: "10px" }}>Compactness: </span>
                <br />
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <Slider
                        marks={marks}
                            step={0.1}
                            min={0.3}
                            max={0.6}
                            onChange={this.handleCompactnessChange}
                            value={typeof CompactnessinputValue === 'number' ? CompactnessinputValue : 0}
                        />
                    </Col>
                </Row>

                <br></br>
                <span style={{ fontSize: 20, marginLeft: 40 }}>Minority Group Selection: </span>
                <Row style={{ marginTop: 15 }}>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <Select defaultValue="HISPANIC" style={{ width: 240 }} onChange={this.handleGroupChange}
                            mode="multiple"
                            allowClear>
                            <Option value="HISPANIC">Hispanic</Option>
                            <Option value="WHITE">White</Option>
                            <Option value="BLACK">Black</Option>
                            <Option value="ASIAN">Asian</Option>
                            <Option value="NATIVE">American Indian and Alaska Native</Option>
                            <Option value="NHPI">Native Hawaiian and Pacific Islander</Option>
                            {/* <Option value="Other race">Other race</Option> */}
                        </Select>

                    </Col>
                </Row>

                <br />
                <Row>
                    <Col span={8}></Col>
                    <Col span={4}>
                        <Button onClick={this.PopUpHandler} value="large" type="primary"> Run</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={2}></Col>
                    <Col span={18}>
                        <Progress percent={this.state.percent} />
                    </Col>
                </Row>

                <Modal
          title="Success"
          visible={this.state.visible}
          onOk={this.handleOk}
        >
          <p>Job ID: {this.state.message.jobId} submitted</p>
        </Modal>

            </Content>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
        mapAction: bindActionCreators(mapAction, dispatch),
        PopUpAction: bindActionCreators(PopUpAction, dispatch),
        addResult: bindActionCreators(addResult, dispatch),
        deleteResult: bindActionCreators(deleteResult, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        Mapstate: state.Mapstate,
        MapDisplay: state.MapDisplay
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneratePlan);