import rootReducer from "../reducers/index"
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";


export default function configureStore(){
    const store = createStore(rootReducer,
        composeWithDevTools(applyMiddleware(logger, thunk)));
    return store;
}
