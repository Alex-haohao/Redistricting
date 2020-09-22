import React from "react"
import { Route, HashRouter, Switch } from "react-router-dom"

import NotFound from "../pages/NotFound"
import App from "../pages/app/App"
import SourcePage from '../pages/sourcePage'
import AboutUs from '../pages/aboutus'
// import AlexHome from '../pages/MyHome'


export default class AppRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={App} ></Route>
                    <Route path="/sourcepage" component={SourcePage}></Route>
                    <Route path="/aboutus" component={AboutUs}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </HashRouter>
        )
    }
}