import React, { Component } from 'react'
import axios from 'axios'
import PasswordInput from '../../node_modules/grommet/components/PasswordInput'
import { FormField, TextInput, Button } from 'grommet'
let baseURL = `http://localhost:3000`

class CreateAccount extends Component {
  state = {
    first: '',
    last: '',
    email: '',
    phone: '',
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
  handlePhoneChange = (e) => {
    this.setState({phone: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  createCheck = (e) => {
    e.preventDefault()
    let first = this.state.first
    let last = this.state.last
    let email = this.state.email
    let phone = this.state.phone
    let password = this.state.password
    axios.post(`${baseURL}/signup`, { first, last, email, phone, password })
    .then (data => {
      let user_id = data.data[0].id
      this.props.saveUser(user_id, first, last, email, phone)
      this.props.history.push('/quiz01')
    })
    .catch(e => console.log(e))
  }

  render() {
    return(
      <div className="box2">
        <form id="createForm" onSubmit={this.createCheck}>
          <div className="emailInput">
            <FormField label='First Name:' className="tl" onChange={this.handleFirstChange}>
              <TextInput name="first" type="text"  required />
            </FormField>
          </div>
          <div className="emailInput">
            <FormField label='Last Name:' className="tl" onChange={this.handleLastChange}>
              <TextInput name="last" type="text"  required />
            </FormField>
          </div>
          <div className="emailInput">
            <FormField label='Email' className="tl" onChange={this.handleEmailChange}>
              <TextInput name="email" type="email"  required />
            </FormField>
          </div>
          <div className="emailInput">
            <FormField label='Phone:' className="tl" onChange={this.handlePhoneChange}>
              <TextInput name="phone" type="tel"  required />
            </FormField>
          </div>
          <div className="passInput">
            <FormField label='Password'className="tl" >
              <PasswordInput ref="password" name="password" onChange={this.handlePasswordChange} required/>
            </FormField>
          </div>
          <Button label='log in'
            id="loginButt"
            className="submit"
            onClick={this.createCheck}
            primary={false}
            secondary={false}
            type='submit' />
        </form>
      </div>
    )
  }
}


export default CreateAccount
