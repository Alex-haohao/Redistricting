import React from "react"
import { Route, HashRouter, Switch } from "react-router-dom"

import NotFound from "../pages/NotFound"
import App from "../pages/app/App"
// import AlexHome from '../pages/MyHome'


export default class AppRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App path ="/"> 
                <Switch>
                    {/* <Route exact path="/" component={AlexHome} ></Route> */}
                    <Route path="*" component={NotFound}></Route>
                </Switch>
                </App>
            </HashRouter>
        )
    }
}