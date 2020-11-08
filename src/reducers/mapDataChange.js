import * as mapActions from "../constans/map"
import stateGeoData from "../static/stateGeoJson"

const initState = {
    geodata: stateGeoData,
    state:"US",
    mode:"state"
  }

const changeMapData = (state=initState,action) =>{
    switch(action.type){
        case mapActions.MAPDATA:
            return{
                geodata: action.data.geodata ,
                state:action.data.state ? action.data.state : "US",
                mode:action.data.mode ? action.data.mode : "state"
            }
        default:
            return state;
    }
}

export default changeMapData;