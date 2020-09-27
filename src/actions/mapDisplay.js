import * as mapActions from "../constans/map"

export function changeMapDisplay(data){
    return{
        type:mapActions.DISPLAYCHANGE,
        data
    }
}