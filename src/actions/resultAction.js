import * as Result from "../constans/result"

export function changeCurrentResult(data){
    return{
        type:Result.UPDATE,
        data
    }
}

