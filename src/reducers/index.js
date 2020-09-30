import {combineReducers} from 'redux'
import Mapstate from './mapState'
import MapDisplay from './mapDisplay'
import PopUp from './PopUp'
import Result from './result'

const rootReducers = combineReducers({Mapstate,MapDisplay,PopUp,Result})

export default rootReducers