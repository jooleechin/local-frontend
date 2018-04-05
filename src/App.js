import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/CreateAccount'
import Quiz01 from './components/Quiz_01_Destination'
import Quiz02 from './components/Quiz_02_Stay'
import Quiz03 from './components/Quiz_03_Transport'
import Quiz04 from './components/Quiz_04_Time'
import Quiz05 from './components/Quiz_05_Interest'
import Results from './components/Results'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: 0,
      first: '',
      lat_stay: '',
      lng_stay: '',
      destination: '',
      q1_transport: '',
      q2_time: [],
      q3_interests: []
    }
  }

  saveUser = (user_id, first, last, email, phone) => {
    this.setState({
      user_id: user_id,
      first: first,
      last: last,
      email: email,
      phone: phone
    })
  }

  saveQuiz = (newState) => {
    this.setState(newState)
  }

  clearUser = () => {
    this.setState({
      user_id: 0,
      first: '',
      last: '',
      email: '',
      phone: ''
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header id={this.state.id} name={this.state.first} clearUser={this.clearUser} />
          <Route path="/login" render={props => (
            <Login saveUser={this.saveUser} clearUser={this.clearUser} {...props} />
          )} />
          <Route path="/signup" render={props => (
            <Signup saveUser={this.saveUser} {...props} />
          )} />
          <Route path="/quiz01" render={props => (
            <Quiz01 saveQuiz={this.saveQuiz} user_id={this.state.user_id} {...props} />
          )} />
          <Route path="/quiz02" render={props => (
            <Quiz02 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/quiz03" render={props => (
            <Quiz03 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/quiz04" render={props => (
            <Quiz04 q2_time={this.state.q2_time} saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/quiz05" render={props => (
            <Quiz05
              first={this.state.first}
              lat_stay={this.state.lat_stay}
              lng_stay={this.state.lng_stay}
              destination={this.state.destination}
              q1_transport={this.state.q1_transport}
              q2_time={this.state.q2_time}
              q3_interests={this.state.q3_interests}
              user_id={this.state.user_id}
              saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/main" render={props => (
            <Results
              first={this.state.first}
              lat_stay={this.state.lat_stay}
              lng_stay={this.state.lng_stay}
              destination={this.state.destination}
              q1_transport={this.state.q1_transport}
              q2_time={this.state.q2_time}
              q3_interests={this.state.q3_interests}
              user_id={this.state.user_id} {...props} />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
