import * as mapActions from "../constans/map"
import stateGeoData from "../static/stateGeoJson"

const initState = {
    geodata: stateGeoData,
    center: [37.8, -96],
    zoom: 4,
    position:"US",
    mode:"state",
    geokey:"abcde"
  }

const geomap = (state=initState,action) =>{
    switch(action.type){
        case mapActions.STATECHANGE:
            return{
                center:JSON.parse(JSON.stringify(action.data.center)),
                zoom:action.data.zoom,
                position:action.data.position,
                geodata: action.data.geodata ? action.data.geodata : stateGeoData,
                geokey:action.data.geokey? action.data.geokey:"abcde",
                mode : action.data.mode ? action.data.mode : "precinct"
            }
    
        default:
            return state;
    }
}

export default geomap;