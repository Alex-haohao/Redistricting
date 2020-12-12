import * as Result from "../constans/result"

const initState = {
    jobid: -1,
    status: "no",
    boxData: [],
    minorities : [],
    demographic : []
  }


const result = (state=initState,action) =>{
    switch(action.type){
        case Result.UPDATE:
            return{
                jobid:action.data.jobid,
                status:action.data.status,
                boxData : action.data.boxData ? action.data.boxData : [],
                minorities : action.data.minorities ? action.data.minorities :[],
                demographic : action.data.demographic ? action.data.demographic :[],
            }
    
        default:
            return state;
    }
}

export default result;