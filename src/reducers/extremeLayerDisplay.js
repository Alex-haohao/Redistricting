import * as layerDisplay from "../constans/layer"

const initState = {
    extremeGeodata: "",
    jobid: ""
  }

const layergeomap = (state=initState,action) =>{
    switch(action.type){
        case layerDisplay.EXTREMEDISPLAYCHANGE:
            return{
                extremeGeodata: action.data.extremeGeodata ? action.data.extremeGeodata : "",
                jobid: action.data.jobid ? action.data.jobid : "123",
            }
    
        default:
            return state;
    }
}

export default layergeomap;