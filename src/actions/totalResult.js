import {ADD,DELETE} from '../constans/totalResult'
import api from "../api"

export function addResult(data){
    return{
        type:ADD,
        data
    }
}

export const deleteResult = (id) =>{
    return{
        type:DELETE,
        id
    }
}

export const update = () =>{
    return dispatch =>{
         api.jobs.getJob().then(res =>res.json()).then(data => {
             return data   
              })
    }
}