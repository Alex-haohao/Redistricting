import * as mapActions from "../constans/map"

const initState = {
    isShow: true,
    display:"default",
    sidemenu:"1"
  }

const mapDisplay = (state=initState,action) =>{
    switch(action.type){
        case mapActions.DISPLAYCHANGE:
            return{
                isShow: action.data.isShow ,
                display:action.data.display ? action.data.display : "default",
                sidemenu:action.data.sidemenu ? action.data.sidemenu : "1"
            }
        default:
            return state;
    }
}

export default mapDisplay;