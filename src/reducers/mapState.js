import * as mapActions from "../constans/map"
import stateGeoData from "../static/stateGeoJson"

const initState = {
    geodata: stateGeoData,
    center: [37.8, -96],
    zoom: 4,
    position:"US",
    mode:"state",
  }

const geomap = (state=initState,action) =>{
    switch(action.type){
        case mapActions.STATECHANGE:
            return{
                center:JSON.parse(JSON.stringify(action.data.center)),
                zoom:action.data.zoom,
                position:action.data.position,
                geodata: action.data.geodata ? action.data.geodata : stateGeoData,
                mode : action.data.mode
            }
    
        default:
            return state;
    }
}

export default geomap;