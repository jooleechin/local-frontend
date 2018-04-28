
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Previous } from 'grommet-icons'
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
        <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to=''><a className="menu-item b">hi, {this.props.name}</a></Link></div>
        <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to='/viewall'><a className="menu-item">all itineraries</a></Link></div>
        <div className="bb b--white-70 mt3"><Link to ='/quiz01'><a className="menu-item">search a city</a></Link></div>
        <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to=''><a className="menu-item" onClick={this.props.clearUser} href="/">logout</a></Link></div>
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
        <Link style={{ textDecoration: 'none' }} to={navi} ><Previous style={style}/></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl menu"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <a className="menu-item" onClick={this.props.clearUser} href="/">logout</a>
        </Menu>
      </div>
      :<div>
        <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to={navi}><Previous style={style}/></Link></div>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl menu"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <a className="menu-item" href="/login">login</a>
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
        <Link style={{ textDecoration: 'none' }} to={navi}><Previous style={style}/></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl menu"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to=''><a className="menu-item b">hi, {this.props.name}</a></Link></div>
          <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to='viewall'><a className="menu-item">all itineraries</a></Link></div>
          <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to='/quiz01'><a className="menu-item">search a city</a></Link></div>
          <div className="bb b--white-70 mt3"><Link style={{ textDecoration: 'none' }} to=''><a className="menu-item" onClick={this.props.clearUser} href="/">logout</a></Link></div>
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
    if (path === "/main") naviButt = this.changeToLogout()
    if (path === "/viewall/itin") naviButt = this.backButt('/viewall')
    if (path === "/viewall/itin/detail") naviButt = this.backButt('/viewall/itin')
    if (path === '/viewall/main/detail') naviButt = this.backButt('/viewall/main')
    if (path === '/main/detail') naviButt = this.backButt('/main')
    if (path === '/detail') naviButt = this.backButt('/itin')
    if (path === '/itin') naviButt = this.backButt('/main')
    if (path === '/login' || path === '/signup') naviButt = this.loginBack('/')
    if (path === '/quiz02') naviButt = this.backButt('/quiz01')
    if (path === '/quiz03') naviButt = this.backButt('/quiz02')
    if (path === '/quiz04') naviButt = this.backButt('/quiz03')
    if (path === '/quiz05') naviButt = this.backButt('/quiz04')
    if (path === '/quiz06') naviButt = this.backButt('/quiz05')
    if (path === '/quiz07') naviButt = this.backButt('/quiz06')

    return(
      <div className='headerButt'>
        {naviButt}
      </div>
    )
  }
}

export default Header
