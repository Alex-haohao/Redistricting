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
    ,
    updateJob(){
        return getData(base.updataJob)
    },
    cancelJob(data){
        return deleteData(base.job + '/' + data + "/cancel")
    }

}


export default jobs;