import * as mapActions from "../constans/map"

const initState = {
    center: [37.8, -96],
    zoom: 4,
    position:"US"
  }

const geomap = (state=initState,action) =>{
    switch(action.type){
        case mapActions.STATECHANGE:
            return{
                center:JSON.parse(JSON.stringify(action.data.center)),
                zoom:action.data.zoom,
                position:action.data.position
            }

        default:
            return state;
    }
}

export default geomap;