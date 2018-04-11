import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/CreateAccount'
import Quiz01 from './components/Quiz_01_Destination'
import Quiz02 from './components/Quiz_02_Stay'
import Quiz03 from './components/Quiz_03_Money'
import Quiz04 from './components/Quiz_04_Transport'
import Quiz05 from './components/Quiz_05_Time'
import Quiz06 from './components/Quiz_06_Interest'
import Quiz07 from './components/Quiz_07_MakeItin'
import Results from './components/Results'
import Itin from './components/Itin'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: 0,
      first: '',
      lat_stay: '',
      lng_stay: '',
      radius: '',
      destination: '',
      q1_transport: '',
      q2_money: 0,
      q3_time: [],
      q4_interests: [],
      place_ID: '',
      query: '',
      itin_id: 0,
      date: '',
      itinName: ''
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
          <Header user_id={this.state.user_id} name={this.state.first} clearUser={this.clearUser} />
          <Route path="/login" render={props => (
            <Login saveUser={this.saveUser} clearUser={this.clearUser} saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/signup" render={props => (
            <Signup saveUser={this.saveUser} {...props} />
          )} />
          <Route path="/quiz01" render={props => (
            <Quiz01 itin_id={this.state.itin_id} saveQuiz={this.saveQuiz} user_id={this.state.user_id} {...props} />
          )} />
          <Route path="/quiz02" render={props => (
            <Quiz02 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/quiz03" render={props => (
            <Quiz03 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/quiz04" render={props => (
            <Quiz04 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/quiz05" render={props => (
            <Quiz05 q3_time={this.state.q3_time} saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/quiz06" render={props => (
            <Quiz06
              first={this.state.first}
              lat_stay={this.state.lat_stay}
              lng_stay={this.state.lng_stay}
              destination={this.state.destination}
              radius={this.state.radius}
              q1_transport={this.state.q1_transport}
              q2_money={this.state.q2_money}
              q3_time={this.state.q3_time}
              q4_interests={this.state.q4_interests}
              user_id={this.state.user_id}
              saveQuiz={this.saveQuiz}
              itin_id={this.state.itin_id}
              query={this.state.query} {...props} />
          )} />
          <Route path="/quiz07" render={props => (
            <Quiz07
              itin_id={this.state.itin_id}
              user_id={this.state.user_id}
              saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route path="/main" render={props => (
            <Results
              first={this.state.first}
              lat_stay={this.state.lat_stay}
              lng_stay={this.state.lng_stay}
              destination={this.state.destination}
              radius={this.state.radius}
              q1_transport={this.state.q1_transport}
              q2_money={this.state.q2_money}
              q3_time={this.state.q3_time}
              q4_interests={this.state.q4_interests}
              user_id={this.state.user_id}
              itin_id={this.state.itin_id}
              query={this.state.query} {...props} />
          )} />
          <Route path="/itin" render={props => (
            <Itin
              user_id={this.state.user_id}
              itin_id={this.state.itin_id}
              date={this.state.date} {...props} />
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
