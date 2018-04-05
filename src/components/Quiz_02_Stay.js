
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_02_Stay extends Component {
  saveLatDestin = (e) => {
    e.preventDefault()
    // this.props.saveQuiz({latlang_stay: e.target.search_input.value})
    this.props.history.push('/quiz03')
  }
  sendData = (lat, lng) => {
    this.props.saveQuiz({
      lat_stay: lat,
      lng_stay: lng
    })
  }

  render() {
    return(
      <div>
        <form className="QandA" onSubmit={this.saveLatDestin}>
          <label for="question" className="question">where are you staying?</label>
            <SearchBar
              send={this.sendData}
              placeholder='Search places...'
            />
          <input type="submit" value="next" id="submit" />
        </form>
      </div>
    )
  }
}

export default Quiz_02_Stay
