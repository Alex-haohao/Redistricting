import {combineReducers} from 'redux'
import Mapstate from './mapState'
import MapDisplay from './mapDisplay'
import PopUp from './PopUp'

const rootReducers = combineReducers({Mapstate,MapDisplay,PopUp})

export default rootReducers