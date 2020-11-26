import * as layerDisplay from "../constans/layer"

const initState = {
    averageGeodata: "",
    jobid: ""
  }

const layergeomap = (state=initState,action) =>{
    switch(action.type){
        case layerDisplay.AVERAGEDISPLAYCHANGE:
            return{
                averageGeodata: action.data.averageGeodata ? action.data.averageGeodata : "",
                jobid: action.data.jobid ? action.data.jobid : "123",
            }
    
        default:
            return state;
    }
}

export default layergeomap;