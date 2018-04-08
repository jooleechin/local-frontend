import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
let baseURL = 'http://localhost:3000'

class Login extends Component {
  loginCheck = (e) => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    axios.post(`${baseURL}/login`, { email, password })
    .then (data => {
      let id = data.data.matches.id
      let first = data.data.matches.first
      let last = data.data.matches.last
      let email = data.data.matches.email
      let phone = data.data.matches.phone
      if (data.data.matches) {
        this.props.saveUser(id, first, last, email, phone)
        // just for test
        this.props.saveQuiz({
          lat_stay: '47.6221999',
          lng_stay: '-122.3163333',
          radius: '10000',
          destination: 'seattle, wa',
          q1_transport: 'car',
          q2_money: 2,
          q3_time: 'morning',
          q4_interests: ['shopping_mall', 'cafe']
        })
        this.props.history.push('/main')
        // just for test
        // this.props.history.push('/quiz01')
      } else {
        alert('Your password is not correct!')
      }
    })
    .catch(e => console.log(e))
  }
  render() {
    // console.log(this.props) this.props.history gets a list of different functions useful for redirection
    return(
      <div className="box2">
        <form id="formLogin" onSubmit={this.loginCheck}>
          <div>
            <label for="email" className="calisto">email: </label>
              <input name="email" id="email" type="email" required/>
          </div>
          <div>
            <label for="password" className="calisto">password: </label>
              <input name="password" id="password" type="password" required/>
          </div>
          <div className="submitOcreate">
            <input type="submit" value="login" id="submit" className="calisto grow" />
          </div>
        </form>
        <Link to="/signup"><h3 className="grow tc create">create a new account!</h3></Link>
      </div>
    )
  }
}

export default Login
