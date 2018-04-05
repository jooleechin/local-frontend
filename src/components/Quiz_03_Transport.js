
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_03_Transport extends Component {
  saveAnswer = (e) => {
    this.props.saveQuiz({q1_transport: e.target.dataset.answer})
  }
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">what is your method of transportation?</h2>
          <div className="choices">
            <span onClick={this.saveAnswer} data-answer='car'>car</span>
            <span onClick={this.saveAnswer} data-answer='public_transit'>public transit</span>
            <span onClick={this.saveAnswer} data-answer='rideshare'>rideshare</span>
            <span onClick={this.saveAnswer} data-answer='walking'>walking</span>
          </div>
        </div>
        <Link to="/quiz04"><div className="next">next</div></Link>
      </div>
    )
  }
}

export default Quiz_03_Transport
