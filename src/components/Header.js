
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { User, Search, LinkPrevious } from 'grommet-icons'
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
        className="avenir tl"
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <a className="menu-item pt3 b">hi, {this.props.name}</a>
        <Link to='/viewall'><a className="menu-item--small pt3">all itineraries</a></Link>
        <Link to ='/quiz01'><a className="menu-item--small pt3">search a city</a></Link>
        <a className="menu-item pt3" onClick={this.props.clearUser} href="/">logout</a>
      </Menu>
      :<Menu right
        width={260}
        styles={this.state.styles}
        isOpen={this.state.menuOpen}
        className="avenir tl"
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <a className="menu-item pt3" href="/login">login</a>
      </Menu>
  }

  loginBack = (navi) => {
    return this.props.user_id
      ?<div>
        <Link to={navi}><LinkPrevious /></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <a className="menu-item pt3" onClick={this.props.clearUser} href="/">logout</a>
        </Menu>
      </div>
      :<div>
        <Link to={navi}><LinkPrevious /></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <a className="menu-item pt3" href="/login">login</a>
        </Menu>
      </div>
    }

  backButt = (navi) => {
    return this.props.user_id
      ?<div>
        <Link to={navi}><LinkPrevious /></Link>
        <Menu right
          width={260}
          styles={this.state.styles}
          isOpen={this.state.menuOpen}
          className="avenir tl"
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <a className="menu-item pt3 b">hi, {this.props.name}</a>
          <Link to='viewall'><a className="menu-item--small pt3">all itineraries</a></Link>
          <Link to='/quiz01'><a className="menu-item--small pt3">search a city</a></Link>
          <a className="menu-item pt3" onClick={this.props.clearUser} href="/">logout</a>
        </Menu>
      </div>
      :<Menu right
        width={260}
        styles={this.state.styles}
        isOpen={this.state.menuOpen}
        className="avenir tl"
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <a className="menu-item pt3" href="/login">login</a>
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
