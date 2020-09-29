import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mapAction from '../../../../actions/mapAction'
import * as mapDisplayAction from '../../../../actions/mapDisplay'
import * as PopUpAction from '../../../../actions/showPopUp'
import { InputNumber } from 'antd';
import { Layout, Slider, Row, Col, Button, Progress } from 'antd';
const { Content } = Layout;


class Tab3 extends React.Component {

    constructor() {
        super()
        this.state = {
            colorvalue: 1,
            levelvalue: 1,
            inputValue: 1,
            percent: 0,
        };
    }

    onRunNumChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }

    PopUpHandler = () => {
        let timer = setInterval(() => {
            let percent = this.state.percent + 10;
            if (percent > 100) {
                percent = 100;
            }
            this.setState({ percent });

            if (this.state.percent === 100) {
                setTimeout(() => {

                    clearInterval(timer);
                    this.props.PopUpAction.changePopUp({
                        isPopUp: true,
                    })
                    this.setState({ percent :0});
                    
                }, 500);
            }

        }, 200);

        

    }


    render() {
        let { inputValue } = this.state;


        return (

            <Content>
                <span style={{ fontSize: 20, marginLeft: "30px", marginRight: "10px" }}>Number of run: </span>
                <InputNumber size="large" min={100} max={10000} value={inputValue} onChange={this.onRunNumChange} />
                <br />
                <Row>
                    <Col span={2}></Col>
                    <Col span={18}>
                        <Slider
                            min={100}
                            max={10000}
                            onChange={this.onRunNumChange}
                            value={typeof inputValue === 'number' ? inputValue : 0}
                        />
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col span={8}></Col>
                    <Col span={4}>
                        <Button onClick={this.PopUpHandler} value="large" type="primary"> Run</Button>
                    </Col>
                </Row>
            <br/>

            <Row>
                    <Col span={2}></Col>
                    <Col span={18}>
                    <Progress percent={this.state.percent} />
                    </Col>
                </Row>

            </Content>



        );
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        mapDisplayAction: bindActionCreators(mapDisplayAction, dispatch),
        mapAction: bindActionCreators(mapAction, dispatch),
        PopUpAction: bindActionCreators(PopUpAction, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        Mapstate: state.Mapstate,
        MapDisplay: state.MapDisplay
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);