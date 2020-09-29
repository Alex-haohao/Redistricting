import React from "react"
import { Result, Button } from 'antd';
import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as PopUpAction from '../../actions/showPopUp'


class Success extends React.Component {

    PopUpHandler = ()=>{
        this.props.PopUpAction.changePopUp({
            isPopUp: false,
          })
      }

    render() {
        return (
            <Result
            style={{position:"fixed",zIndex:10000,backgroundColor:"white",width:"100%",height:"100%"}}
            status="success"
            title="Successfully got result"
            subTitle="Click button back to Home Page"
            extra={[
              <Button onClick={this.PopUpHandler} type="primary" key="home">
                Go Home
              </Button>
            ]}
          />
        )
    }
}


const mapDispatchToProps = (dispatch) =>{
    return {
        PopUpAction:bindActionCreators(PopUpAction,dispatch),
    }
}

const mapStateToProps =(state)=>{
    return{
        Mapstate:state.Mapstate,
        MapDisplay:state.MapDisplay
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Success) ;