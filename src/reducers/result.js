import * as Result from "../constans/result"

const initState = {
    jobid: -1,
    status: "no",
    boxData: [],
    minorities : [],
    demographic : [],
    averageid:-1,
    extremeid:-1,
    randomid:-1,
    extremeDemographic:-1,
    randomDemographic:-1,
    jobData : {}
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
                extremeDemographic : action.data.extremeDemographic ? action.data.extremeDemographic :[],
                randomDemographic : action.data.randomDemographic ? action.data.randomDemographic :[],
                averageid: action.data.averageid ? action.data.averageid : -1,
                extremeid: action.data.extremeid ? action.data.extremeid : -1,
                randomid: action.data.randomid ? action.data.randomid : -1,
                jobData:action.data.jobData ? action.data.jobData : -1,
            }
    
        default:
            return state;
    }
}

export default result;