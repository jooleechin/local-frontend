
import React, { Component } from 'react'
import SearchBar from './SearchBar'

class Quiz_01_Destination extends Component {

  saveLatDestin = (e) => {
    e.preventDefault()
    this.props.saveQuiz({destination: e.target.search_input.value})
    this.props.history.push('/quiz02')

  }
  sendData = (lat, lng) => {
    console.log(lat)
    console.log(lng)
  }

  render() {
    return(
      <div>
        <form className="QandA" onSubmit={this.saveLatDestin}>
          <label for="question" className="question">where is your destination?</label>
            <SearchBar
              send={this.sendData}
              placeholder='Search cities...'
              options={{types: ['(cities)']}}
            />
          <input type="submit" value="next" id="submit" />
        </form>
      </div>
    )
  }
}

export default Quiz_01_Destination
