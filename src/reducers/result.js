import * as Result from "../constans/result"

const initState = {
    jobid: -1,
    status: "no"
  }


const result = (state=initState,action) =>{
    switch(action.type){
        case Result.UPDATE:
            return{
                jobid:action.data.jobid,
                status:action.data.status,
            }
    
        default:
            return state;
    }
}

export default result;