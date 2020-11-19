import base from "./base"
import { getData,postData,deleteData } from "../utils/http"


const jobs = {
    addJob(data){
        return postData(base.job,data);
    }
    ,
    getJob(){
        return getData(base.jobs)
    }
    ,
    deleteJob(data){
        return deleteData(base.job + '/' + data)
    }
}


export default jobs;