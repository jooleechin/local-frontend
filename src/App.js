import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Quiz from './components/Quiz'
import Login from './components/Login'
import SearchBar from './components/SearchBar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: 0,
      first: '',
      last: '',
      email: '',
      phone: '',
      q1: '',
      q2: '',
      q3: ''
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

  saveQuiz = (user_id, first, q1, q2, q3) => {
    this.setState({
      user_id: user_id,
      first: first,
      q1: q1,
      q2: q2,
      q3: q3
    })
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
          <Route path="/search" component={SearchBar} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
