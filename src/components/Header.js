
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Anchor, UserIcon, SearchIcon } from 'grommet'

class Header extends Component {
  changeToLogout() {
    let user_id = this.props.user_id
    return user_id
      ?<Link to='/'><Anchor onClick={this.props.clearUser}className="signLog tracked pointer tr">logout</Anchor></Link>
      :<Link to="/Login"><Anchor className="signLog tracked pointer tr" >login</Anchor></Link>
  }
  render() {
    return(
      <div className='headerButt'>
        <Anchor icon={<SearchIcon />} path={{path: '/quiz01'}} primary={false} reverse={true} />
        <Menu responsive={false} icon={<UserIcon />} inline={false} primary={false}>
          <Anchor>
            hi, {this.props.name}
          </Anchor>
          <Anchor path={{path: '/login'}}>
            my account
          </Anchor>
        </Menu>
      </div>
    )
  }
}

export default Header
