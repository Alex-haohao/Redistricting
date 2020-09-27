import * as mapActions from "../constans/map"

const initState = {
    isShow: true,
    display:"default"
  }

const mapDisplay = (state=initState,action) =>{
    switch(action.type){
        case mapActions.DISPLAYCHANGE:
            return{
                isShow: action.data.isShow,
                display:action.data.display
            }
        default:
            return state;
    }
}

export default mapDisplay;