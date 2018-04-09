
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Anchor, UserIcon, SearchIcon } from 'grommet'

class Header extends Component {
  changeToLogout() {
    return this.props.id
      // ?<Link to="/"><h1 onClick={this.props.clearUser}className="signLog tracked pointer grow">logout</h1></Link>
      // :<Link to="/Login"><h1 className="signLog tracked pointer grow" >login</h1></Link>
      ?<h1 onClick={this.props.clearUser}className="signLog tracked pointer tr">logout</h1>
      :<Link to="/Login"><h1 className="signLog tracked pointer tr" >login</h1></Link>
  }
  render() {
    return(
      <div className='headerButt'>
        <Anchor icon={<SearchIcon />} href='#' primary={false} reverse={true} />
        <Menu responsive={false} icon={<UserIcon />} inline={false} primary={false}>
          <Anchor>
            hi, {this.props.name}
          </Anchor>
          <Anchor path={{path: '/login'}}>
            my account
          </Anchor>
          <Anchor href='#'>
            logout
          </Anchor>
        </Menu>
      </div>
    )
  }
}

export default Header
