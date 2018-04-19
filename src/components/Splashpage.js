
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import icon from '../assests/location.jpg'

class Splashpage extends Component {
  render() {
    return(
      <div id="splashpage">
        <div className="splashpageContent">
          <div className="titles">
            <div className="icon"><img src={icon} alt={icon} /></div>
            <div className="appTitle b"><h1>local</h1></div>
            <div className="appDesc avenir "><h4>On your trip, explore the neighborhood like a local.</h4></div>
          </div>

          <div className="loginSignupButts">
            <Link to='/login'><button className="loginButt pa3 ttu avenir fw4"><p>login</p></button></Link>
            <Link to='/signup'><button className="signupButt pa3 ttu avenir fw4"><p>signup</p></button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Splashpage
