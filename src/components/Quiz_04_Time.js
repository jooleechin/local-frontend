
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_04_Time extends Component {
  removeDup = (val, i, self) => (self.indexOf(val) === i)
  saveAnswer = (e) => {
    let timeSlot = [...this.props.q2_time]
    timeSlot.push(e.target.dataset.answer)
    let unique = timeSlot.filter(this.removeDup)
    this.props.saveQuiz({q2_time: unique})
  }
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">when do you want an itinerary for?<br />(you can choose more than one option)</h2>
          <div className="choices">
            <span onClick={this.saveAnswer} data-answer='morning'>morning</span>
            <span onClick={this.saveAnswer} data-answer='afternoon'>afternoon</span>
            <span onClick={this.saveAnswer} data-answer='evening'>evening</span>
            <span onClick={this.saveAnswer} data-answer='all_day'>all day</span>
          </div>
        </div>
        <Link to="/quiz05"><div className="next">next</div></Link>
      </div>
    )
  }
}

export default Quiz_04_Time
