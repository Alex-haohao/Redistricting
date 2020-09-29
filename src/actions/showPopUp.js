import * as PopUp from "../constans/PopUp"

export function changePopUp(data){
    return{
        type:PopUp.ISPOPUP,
        data
    }
}

