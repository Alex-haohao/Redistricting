import React from "react"
import { Result, Button } from 'antd';
import {connect} from 'react-redux'
import{bindActionCreators}  from 'redux'
import * as PopUpAction from '../../actions/showPopUp'
import * as mapDisplayAction from '../../actions/mapDisplay'

import './style.css'

class Success extends React.Component {

    PopUpHandler = ()=>{
        this.props.PopUpAction.changePopUp({
            isPopUp: false,
          })

          this.props.mapDisplayAction.changeMapDisplay({
            isShow: true,
            sidemenu:"2",
            display: this.props.MapDisplay.display,
          })
     
      }

    render() {
        return (
           
            <Result
            className="popUpContent"
            style={{position:"fixed",zIndex:10000,backgroundColor:"white"}}
            status="success"
            title="Successfully got result"
            subTitle="Click button back to Home Page"
            extra={[
              <Button onClick={this.PopUpHandler} type="primary" key="home">
                Go to result
              </Button>
            ]}
          />
        //   </div>
         
        )
    }
}


const mapDispatchToProps = (dispatch) =>{
    return {
        PopUpAction:bindActionCreators(PopUpAction,dispatch),
        mapDisplayAction:bindActionCreators(mapDisplayAction,dispatch),
    }
}

const mapStateToProps =(state)=>{
    return{
        Mapstate:state.Mapstate,
        MapDisplay:state.MapDisplay
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Success) ;