import * as layerDisplay from "../constans/layer"

export function changeMapDisplay(data){
    return{
        type:layerDisplay.EXTREMEDISPLAYCHANGE,
        data
    }
}