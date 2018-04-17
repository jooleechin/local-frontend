
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { User, Search, Previous } from 'grommet-icons'
import { stack as Menu } from 'react-burger-menu'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false,
      styles: {
        bmBurgerButton: {
          position: 'fixed',
          width: '18px',
          height: '15px',
          right: '36px',
          top: '20px'
        },
        bmBurgerBars: {
          background: '#373a47'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenu: {
          background: '#373a47',
          // padding: '2.5em 1.5em 0',
          padding: '1.0em',
          fontSize: '1.15em'
        },
        bmMorphShape: {
          fill: '#373a47'
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em'
        },
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)',
          left: '-10px'
        }
      }
    }
  }
  handleStateChange = (state) => this.setState({menuOpen: state.isOpen})

  closeMenu = () => this.setState({menuOpen: false})

  changeToLogout() {
    return this.props.user_id
      ?<Menu right
        width={260}
        styles={this.state.styles}
        isOpen={this.state.menuOpen}
        className="avenir tl menu"
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <Link to=''><a className="menu-item bb b--white-70 b">hi, {this.props.name}</a></Link>
        <Link to='/viewall'><a className="menu-item bb b--white-70">all itineraries</a></Link>
        <Link to ='/quiz01'><a className="menu-item bb b--white-70">search a city</a></Link>
        <Link to=''><a className="menu-item bb b--white-70" onClick={this.props.clearUser} href="/">logout</a></Link>
      </Menu>
      :<Menu right
        width={260}
        styles={this.state.styles}
        isOpen={this.state.menuOpen}
        className="avenir tl menu"
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <a className="menu-item bb b--white-70" href="/login">login</a>
      </Menu>
  }

  loginBack = (navi) => {
    const style = {
      position: 'fixed',
      left: '25px',
      top: '22px',
      height: '15px',
      width: '18px',
      color: 'black'
    }
    return this.props.user_id
      ?<div>
        <Link to={navi} ><Previous style={style}/></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl menu"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <a className="menu-item bb b--white-70" onClick={this.props.clearUser} href="/">logout</a>
        </Menu>
      </div>
      :<div>
        <Link to={navi}><Previous style={style}/></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl menu"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <a className="menu-item bb b--white-70" href="/login">login</a>
        </Menu>
      </div>
    }

  backButt = (navi) => {
    const style = {
      position: 'fixed',
      left: '25px',
      top: '22px',
      height: '15px',
      width: '18px',
      color: 'black'
    }
    return this.props.user_id
      ?<div>
        <Link to={navi}><Previous style={style}/></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl menu"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <Link to=''><a className="menu-item bb b--white-70 b">hi, {this.props.name}</a></Link>
          <Link to='viewall'><a className="menu-item bb b--white-70">all itineraries</a></Link>
          <Link to='/quiz01'><a className="menu-item bb b--white-70">search a city</a></Link>
          <Link to=''><a className="menu-item bb b--white-70" onClick={this.props.clearUser} href="/">logout</a></Link>
        </Menu>
      </div>
      :<Menu right
        width={260}
        styles={this.state.styles}
        isOpen={this.state.menuOpen}
        className="avenir tl menu"
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <a className="menu-item bb b--white-70" href="/login">login</a>
      </Menu>
  }

  toggleMenu = () => (
    this.setState({menuOpen: !this.state.menuOpen})
  )

  render() {
    let path = this.props.location.pathname
    let naviButt = this.changeToLogout()
    if (path === "/main") {
      naviButt = this.changeToLogout()
    }
    if (path === '/detail') {
      naviButt = this.backButt('/itin')
    }
    if (path === '/itin') {
      naviButt = this.backButt('/main')
    }
    if (path === '/login') {
      naviButt = this.loginBack('/')
    }
    return(
      <div className='headerButt'>
        {naviButt}
      </div>
    )
  }
}

export default Header
