import * as mapActions from "../constans/map"

export function changMapData(data){
    return{
        type:mapActions.MAPDATA,
        data
    }
}