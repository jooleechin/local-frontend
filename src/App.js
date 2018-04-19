import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import Splashpage from './components/Splashpage'
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
import AllItinView from './components/AllItinView'
import DetailView from './components/DetailView'

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
      itin_id: 0,
      date: '',
      itinName: '',
      choices: [],
      choiceIndex: 0,
      googlePlace_ID: '',
      photoUrls: [],
      order: 0
    }
  }
  saveUser = (user_id, first, last, email) => {
    this.setState({
      user_id: user_id,
      first: first,
      last: last,
      email: email
    })
  }

  saveQuiz = (newState) => {
    this.setState(newState)
  }

  clearUser = () => {
    this.setState({
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
      itin_id: 0,
      date: '',
      itinName: '',
      choices: [],
      choiceIndex: 0,
      email: '',
      last: ''
    })
  }

  headerProps = (props) => {
    return (
      <Header saveQuiz={this.saveQuiz} user_id={this.state.user_id} last={this.state.last} email={this.state.email} name={this.state.first} clearUser={this.clearUser} {...props}/>
    )
  }

  render() {
    const CustomHeader = withRouter(this.headerProps)
    return (
      <BrowserRouter>
        <div className="App">
          <CustomHeader/>
          <Route exact path="/login" render={props => (
            <Login saveUser={this.saveUser} clearUser={this.clearUser} saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route exact path="/" render={props => (
            <Splashpage
              saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route exact path="/signup" render={props => (
            <Signup saveUser={this.saveUser} {...props} />
          )} />
          <Route exact path="/quiz01" render={props => (
            <Quiz01 itin_id={this.state.itin_id} saveQuiz={this.saveQuiz} user_id={this.state.user_id} {...props} />
          )} />
          <Route exact path="/quiz02" render={props => (
            <Quiz02 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route exact path="/quiz03" render={props => (
            <Quiz03 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route exact path="/quiz04" render={props => (
            <Quiz04 saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route exact path="/quiz05" render={props => (
            <Quiz05 q3_time={this.state.q3_time} saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route exact path="/quiz06" render={props => (
            <Quiz06
              q1_transport={this.state.q1_transport}
              q4_interests={this.state.q4_interests}
              saveQuiz={this.saveQuiz} {...props} />
          )} />
          <Route exact path="/quiz07" render={props => (
            <Quiz07
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
              itin_id={this.state.itin_id} {...props} />
          )} />
          <Route exact path="/main" render={props => (
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
              choices={this.state.choices}
              choiceIndex={this.state.choiceIndex}
              place_ID={this.state.place_ID}
              saveQuiz={this.saveQuiz}
              photoUrls={this.state.photoUrls}
              order={this.state.order}
              itin_id={this.state.itin_id} {...props} />
          )} />
          <Route exact path="/viewall/main" render={props => (
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
              choices={this.state.choices}
              choiceIndex={this.state.choiceIndex}
              place_ID={this.state.place_ID}
              saveQuiz={this.saveQuiz}
              photoUrls={this.state.photoUrls}
              order={this.state.order}
              itin_id={this.state.itin_id} {...props} />
          )} />
          <Route exact path="/itin" render={props => (
            <Itin
              time={this.props.q3_time}
              date={this.state.date}
              lat_stay={this.state.lat_stay}
              lng_stay={this.state.lng_stay}
              destination={this.state.destination}
              place_ID={this.state.place_ID}
              choiceIndex={this.state.choiceIndex}
              user_id={this.state.user_id}
              saveQuiz={this.state.saveQuiz}
              itin_id={this.state.itin_id}
              q3_time={this.state.q3_time}
              date={this.state.date} {...props} />
          )} />
          <Route exact path="/viewall/itin" render={props => (
            <Itin
              time={this.props.q3_time}
              date={this.state.date}
              lat_stay={this.state.lat_stay}
              lng_stay={this.state.lng_stay}
              destination={this.state.destination}
              place_ID={this.state.place_ID}
              choiceIndex={this.state.choiceIndex}
              user_id={this.state.user_id}
              saveQuiz={this.state.saveQuiz}
              itin_id={this.state.itin_id}
              q3_time={this.state.q3_time}
              date={this.state.date} {...props} />
          )} />
          <Route exact path="/viewall" render={props => (
            <AllItinView
              itin_id={this.state.itin_id}
              saveQuiz={this.saveQuiz}
              user_id={this.state.user_id} {...props} />
          )} />
          <Route exact path="/detail" render={props => (
            <DetailView
              googlePlace_ID={this.state.googlePlace_ID}
              itin_id={this.state.itin_id}
              saveQuiz={this.saveQuiz}
              user_id={this.state.user_id} {...props} />
          )} />
          <Route exact path="/main/detail" render={props => (
            <DetailView
              googlePlace_ID={this.state.googlePlace_ID}
              itin_id={this.state.itin_id}
              saveQuiz={this.saveQuiz}
              user_id={this.state.user_id} {...props} />
          )} />
          <Route exact path="/viewall/itin/detail" render={props => (
            <DetailView
              googlePlace_ID={this.state.googlePlace_ID}
              itin_id={this.state.itin_id}
              saveQuiz={this.saveQuiz}
              user_id={this.state.user_id} {...props} />
          )} />
          <Route exact path="/viewall/main/detail" render={props => (
            <DetailView
              googlePlace_ID={this.state.googlePlace_ID}
              itin_id={this.state.itin_id}
              saveQuiz={this.saveQuiz}
              user_id={this.state.user_id} {...props} />
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
