import React from 'react';
import './style.less'
import {Link} from 'react-router-dom'



export default class HomeHeader extends React.Component {
    render() {
        return (

            <div className="home-header">
        <div className="home-header-title"><Link to="/">Team Seahawks</Link></div>
        <div className="home-header-subtitle"><p>GUI test</p></div>
        <div className="home-header-nav">
          <div className="home-header-nav-item"><Link to="/">Home</Link></div>

          <div className="home-header-nav-item"><Link to="/sourcepage">Source Page</Link></div>

          <div className="home-header-nav-item"> <Link to="/aboutus">About us</Link></div>

        </div>
      </div>

        )

    }
}
