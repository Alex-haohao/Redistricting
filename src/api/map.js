import base from "./base"
import { getData } from "../utils/http"


const map = {
    getMap(data){
        return getData(base.map+data)
    }
}


export default map;