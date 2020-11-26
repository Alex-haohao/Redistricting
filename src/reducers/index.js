import {combineReducers} from 'redux'
import Mapstate from './mapState'
import MapDisplay from './mapDisplay'
import PopUp from './PopUp'
import Result from './result'
import TotalResult from './totalResult'
import AverageLayerDisplay from './averageLayerDisplay'
import ExtremeLayerDisplay from './extremeLayerDisplay'
import RandomLayerDisplay from './randomLayerDisplay'


const rootReducers = combineReducers({Mapstate,MapDisplay,PopUp,Result,TotalResult,AverageLayerDisplay,ExtremeLayerDisplay,RandomLayerDisplay})

export default rootReducers