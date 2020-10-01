import {ADD,DELETE} from '../constans/totalResult'


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

