import * as Pop from "../constans/PopUp"

const initState = {
    isPopUp: false
  }


const PopUp = (state=initState,action) =>{
    switch(action.type){
        case Pop.ISPOPUP:
            return{
                isPopUp:action.data.isPopUp
            }
    
        default:
            return state;
    }
}

export default PopUp;