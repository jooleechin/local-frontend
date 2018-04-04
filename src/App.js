import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Quiz from './components/Quiz'
import Login from './components/Login'
import Quiz01 from './components/Quiz_01_Destination'
import Quiz02 from './components/Quiz_02_Stay'
import Quiz03 from './components/Quiz_03_Transport'
import Quiz04 from './components/Quiz_04_Time'
import Quiz05 from './components/Quiz_05_Interest'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: 0,
      first: '',
      destination: '',
      latlang_stay: '',
      q1_transport: '',
      q2_time: '',
      q3_interests: ''
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
          <Route path="/quiz" render={props => (
            <Quiz saveQuiz={this.saveQuiz} name={this.state.first} {...props} />
          )} />
          <Route path="/login" render={props => (
            <Login saveUser={this.saveUser} clearUser={this.clearUser} {...props} />
          )} />
          <Route path="/quiz01" component={Quiz01} />
          <Route path="/quiz02" component={Quiz02} />
          <Route path="/quiz03" component={Quiz03} />
          <Route path="/quiz04" component={Quiz04} />
          <Route path="/quiz05" component={Quiz05} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
