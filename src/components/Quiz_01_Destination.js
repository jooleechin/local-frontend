
import React, { Component } from 'react'
import SearchBar from './SearchBar'
import { LinkNext } from 'grommet-icons'

class Quiz_01_Destination extends Component {

  saveLatDestin = (e) => {
    e.preventDefault()
    if (e.target.search_input.value) {
      this.props.saveQuiz({
        destination: e.target.search_input.value,
        choices: []
      })
      this.props.history.push('/quiz02')
    } else {
      return (
        <div className="error">
          <h2>please enter a destination!</h2>
        </div>
      )
    }
  }
  sendData = (lat, lng) => {
    console.log(lat)
    console.log(lng)
  }

  render() {
    return(
      <div className="marginTop">
        <form className="QandA" onSubmit={this.saveLatDestin}>
          <label for="question" className="question">where is your destination?</label>
            <SearchBar
              send={this.sendData}
              placeholder='Search cities...'
              options={{types: ['(cities)']}}
            />
          <input type="submit" id="loginButt1" className="submit" value="next"/>
        </form>
      </div>
    )
  }
}

export default Quiz_01_Destination
