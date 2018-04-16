
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz_04_Transport extends Component {
  saveAnswer = (e) => {
    this.props.saveQuiz({q1_transport: e.target.dataset.answer})
  }
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">what is your method of transportation?</h2>
          <div className="choices" id="choices2">
            <span onClick={this.saveAnswer} className="top2" data-answer='car'>car</span>
            <span onClick={this.saveAnswer} className="top2"data-answer='public_transit'>public transit</span>
            <span onClick={this.saveAnswer} className="bottom2" data-answer='rideshare'>rideshare</span>
            <span onClick={this.saveAnswer} className="bottom2" data-answer='walking'>walking</span>
          </div>
        </div>
        <Link to="/quiz05" style={{ textDecoration: 'none' }}><div className="next submit">next</div></Link>
      </div>
    )
  }
}

export default Quiz_04_Transport
