import * as layerDisplay from "../constans/layer"

const initState = {
    randomGeodata: "",
    jobid: ""
  }

const layergeomap = (state=initState,action) =>{
    switch(action.type){
        case layerDisplay.RONDOMDISPLAYCHANGE:
            return{
                randomGeodata: action.data.randomGeodata ? action.data.randomGeodata : "",
                jobid: action.data.jobid ? action.data.jobid : "123",
            }
    
        default:
            return state;
    }
}

export default layergeomap;