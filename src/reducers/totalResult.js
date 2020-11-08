import {ADD,DELETE} from '../constans/totalResult'
import tempStatic from '../static/resultexample.json'
import lodash from 'lodash'


const TotalResult = (state = tempStatic,action) =>{
    switch(action.type){
        case ADD:
            let newState = lodash.cloneDeep(state)
            newState.features.unshift(action.data)
            return newState

            case DELETE:
                let res = lodash.cloneDeep(state)
                
                for(let i in res.features){
                    if(res.features[i].jobid === action.id.jobid){
                        console.log("hahahahah")
                        res.features.splice(i,1)
                        return res
                    }
                }

                return res

            default: return state
    }
}

export default TotalResult