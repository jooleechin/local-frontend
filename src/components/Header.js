
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  changeToLogout() {
    return this.props.id
      // ?<Link to="/"><h1 onClick={this.props.clearUser}className="signLog tracked pointer grow">logout</h1></Link>
      // :<Link to="/Login"><h1 className="signLog tracked pointer grow" >login</h1></Link>
      ?<h1 onClick={this.props.clearUser}className="signLog tracked pointer grow">logout</h1>
      :<Link to="/Login"><h1 className="signLog tracked pointer grow" >login</h1></Link>
  }
  render() {
    return(
      <div>
        {this.changeToLogout()}
      </div>
    )
  }
}

export default Header
