import * as mapActions from "../constans/map"

export function changeMapState(data){
    return{
        type:mapActions.STATECHANGE,
        data
    }
}

