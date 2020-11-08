import base from "./base"
import { getData,postData,deleteData } from "../utils/http"


const jobs = {
    addJob(data){
        return postData(base.jobs,data);
    }
    ,
    getJob(){
        return getData(base.jobs)
    }
,
    deleteJob(data){
        return deleteData(base.jobs,data)
    }

}


export default jobs;