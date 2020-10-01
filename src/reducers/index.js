import {combineReducers} from 'redux'
import Mapstate from './mapState'
import MapDisplay from './mapDisplay'
import PopUp from './PopUp'
import Result from './result'
import TotalResult from './totalResult'

const rootReducers = combineReducers({Mapstate,MapDisplay,PopUp,Result,TotalResult})

export default rootReducers