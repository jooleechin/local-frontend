import React, { Component } from 'react'
import axios from 'axios'
import { label } from 'grommet'
import { LinkNext } from 'grommet-icons'
// let baseURL = `http://localhost:3000`
let baseURL = `https://local-app.herokuapp.com`

class CreateAccount extends Component {
  state = {
    first: '',
    last: '',
    email: '',
    password: ''
  }

  handleFirstChange = (e) => {
    this.setState({first: e.target.value})
  }
  handleLastChange = (e) => {
    this.setState({last: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  createCheck = (e) => {
    e.preventDefault()
    let first = this.state.first
    let last = this.state.last
    let email = this.state.email
    let password = this.state.password
    axios.post(`${baseURL}/signup`, { first, last, email, password })
    .then (data => {
      let user_id = data.data[0].id
      this.props.saveUser(user_id, first, last, email)
      this.props.history.push('/quiz01')
    })
    .catch(e => console.log(e))
  }

  render() {
    const theme = {
      icon: {
        color: 'white'
      }
    }
    return(
      <div className="createAccountBox marginTop">
        <div><h3 className="avenir b">CREATE YOUR ACCOUNT</h3></div>
        <form id="createForm" onSubmit={this.createCheck}>
          <div className="field">
            <label className="label tl" ></label>
            <div className="control">
              <input className="input" id="input" name="first" type="text" onChange={this.handleFirstChange} placeholder='First name' required />
            </div>
          </div>
          <div className="field">
            <label className="label tl" ></label>
            <div className="control">
              <input className="input" id="input" name="last" type="text" onChange={this.handleLastChange} placeholder='Last name' required />
            </div>
          </div>
          <div className="field">
            <label className="label tl" ></label>
            <div className="control">
              <input className="input" id="input" name="email" type="email" onChange={this.handleEmailChange} placeholder='Email' required />
            </div>
          </div>
          <div className="field">
            <label className="label tl"></label>
            <div className="control">
              <input ref="password" id="input" className="input" type="password" name="password" placeholder='Password' onChange={this.handlePasswordChange} required/>
            </div>
          </div>
          <button id="loginButt1" className="w-100 b ttu avenir submit" onClick={this.createCheck} type='submit'><LinkNext theme={theme}/></button>
        </form>
      </div>
    )
  }
}


export default CreateAccount
