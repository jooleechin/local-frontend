import React, { Component } from 'react'
import axios from 'axios'
import PasswordInput from 'grommet/components/PasswordInput'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import { LinkNext } from 'grommet-icons'
// let baseURL = 'http://localhost:3000'
let baseURL = `https://local-app.herokuapp.com`


class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleEmailChange = (e) => {
    // console.log(e.target.value)
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    // console.log(e.target.value)
    this.setState({password: e.target.value})
  }

  loginCheck = (e) => {
    e.preventDefault()
    let email = this.state.email
    // if (!email) return alert('please enter email!')

    let password = this.state.password
    // if (!password) return alert('please enter password!')
    axios.post(`${baseURL}/login`, { email, password })
    .then (data => {
      console.log(data)
      let id = data.data.matches.id
      let first = data.data.matches.first
      let last = data.data.matches.last
      let email = data.data.matches.email
      console.log(data, 'data')
      if (data.data.matches) {
        this.props.saveUser(id, first, last, email)
        // just for test
        // this.props.saveQuiz({
        //   lat_stay: '47.6221999',
        //   lng_stay: '-122.3163333',
        //   radius: '1000',
        //   destination: 'seattle, wa',
        //   q1_transport: 'walking',
        //   q2_money: 2,
        //   q3_time: 'morning',
        //   date: '04/01/2018',
        //   q4_interests: ['cafe', 'park'],
        //   itin_id: 1,
        //   itinName: 'testing itin'
        // })
        // this.props.history.push('/main')
        // just for test
        this.props.history.push('/viewall')
      } else {
        alert('Your password is not correct!')
      }
    })
    .catch(e => console.log(e))
  }
  render() {
    const theme = {
      icon: {
        color: 'white'
      }
    }
    // console.log(this.props) this.props.history gets a list of different functions useful for redirection
    return(
      <div className="login">
        <form id="formLogin" onSubmit={this.loginCheck}>
          <div className="title avenir b pt4"><p>LOGIN</p></div>
          <div className="loginInput">
            <div className="emailInput">
              <FormField className="tl" onChange={this.handleEmailChange}>
                <TextInput name="email" type="email" placeholder="Email" required />
              </FormField>
            </div>
            <div className="passInput">
              <FormField className="tl">
                <PasswordInput ref="password" name="password" placeholder="Password" onChange={this.handlePasswordChange} required/>
              </FormField>
            </div>
          </div>
          <button id="loginButt1" onClick={this.loginCheck} type='submit'>
            <LinkNext theme={theme} />
          </button>
        </form>
      </div>
    )
  }
}


export default Login
