import React, { Component } from 'react'
import axios from 'axios'
let baseURL = `http://localhost:3000`

class CreateAccount extends Component {
  createCheck = (e) => {
    e.preventDefault()
    let first = e.target.first.value
    let last = e.target.last.value
    let email = e.target.email.value
    let phone = e.target.phone.value
    let password = e.target.password.value
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
            <label for="first" className="calisto">first name: </label>
              <input name="first" id="first" type="text" required autofocus />
            <label for="last" className="calisto">last name: </label>
              <input name="last" id="last" type="text" required />
            <label for="email" className="calisto">email: </label>
              <input name="email" id="email" type="email" required />
            <label for="phone" className="calisto">phone: </label>
              <input name="phone" id="phone" type="phone" required />
            <label for="password" className="calisto">password: </label>
              <input name="password" id="password" type="password" required />
            <input type="submit" value="submit" id="submit" className="grow"/>
        </form>
      </div>
    )
  }
}


export default CreateAccount
