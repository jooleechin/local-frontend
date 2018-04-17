
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz_05_Time extends Component {
  removeDup = (val, i, self) => (self.indexOf(val) === i)
  saveAnswer = (e) => {
    let timeSlot = [...this.props.q3_time]
    timeSlot.push(e.target.dataset.answer)
    let unique = timeSlot.filter(this.removeDup)
    this.props.saveQuiz({q3_time: unique})
  }

  render() {
    return(
      <div>
        <div className="QandA marginTop">
          <h2 className="question">when do you want an itinerary for? select all that apply.</h2>
          <div className="choices" id="choices3">
            <span onClick={this.saveAnswer} className="top2" data-answer='morning'>morning</span>
            <span onClick={this.saveAnswer} className="top2" data-answer='afternoon'>afternoon</span>
            <span onClick={this.saveAnswer} className="bottom2" data-answer='evening'>evening</span>
            <span onClick={this.saveAnswer} className="bottom2" data-answer='all_day'>all day</span>
          </div>
        </div>
        <Link to="/quiz06" style={{ textDecoration: 'none' }}><div className="next submit" >next</div></Link>
      </div>
    )
  }
}

export default Quiz_05_Time
