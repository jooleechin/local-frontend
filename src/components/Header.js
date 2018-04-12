
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../../node_modules/grommet/components/Menu'
import { User, Search } from 'grommet-icons'

class Header extends Component {
  changeToLogout() {
    return this.props.user_id
      ?<Link to='/'><div onClick={this.props.clearUser}className="signLog tracked pointer tr">logout</div></Link>
      :<Link to="/Login"><div className="signLog tracked pointer tr" >login</div></Link>
  }
  render() {
    return(
      <div className='headerButt'>
        <Link to='/quiz01'><Search onClick={this.goToQuiz}/></ Link>
        <Menu responsive={false} icon={<User />} inline={false} primary={false}>
          <div>
            hi, {this.props.name}
          </div>
          <Link to='/login'><div>
            login
          </div></ Link>
          <div onClick={this.props.clearUser}>
            logout
          </div>
        </Menu>
      </div>
    )
  }
}

export default Header
