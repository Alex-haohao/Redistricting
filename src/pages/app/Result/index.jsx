import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ResultBox from "./ResultBox"

import * as mapAction from '../../../actions/mapAction'
import * as mapDisplayAction from '../../../actions/mapDisplay'



class Result extends React.Component {




  render() {
       

    let data = this.props.resData
    console.log(data)

    return (


      <div>
        {
          data.map((element) => {
            return <ResultBox data={element} key={element.jobId} />
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
    TotalResult:state.TotalResult

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);