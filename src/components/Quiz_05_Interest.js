
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_05_Interest extends Component {
  removeDup = (val, i, self) => (self.indexOf(val) === i)

  saveAnswer = (e) => {
    let interests = [...this.props.q3_interests]
    interests.push(e.target.dataset.answer)
    let unique = interests.filter(this.removeDup)
    this.props.saveQuiz({q3_interests: unique})
  }
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">what are your interests?<br />(you can choose more than one option)</h2>
          <div className="choices">
            <span onClick={this.saveAnswer} data-answer='nature'>nature</span>
            <span onClick={this.saveAnswer} data-answer='instagram'>instagram worthy places</span>
            <span onClick={this.saveAnswer} data-answer='shopping'>shopping</span>
            <span onClick={this.saveAnswer} data-answer='food'>food</span>
            <span onClick={this.saveAnswer} data-answer='museums'>museums</span>
            <span onClick={this.saveAnswer} data-answer='random'>random stuff</span>
          </div>
        </div>
        <div className="submit">submit</div>
      </div>
    )
  }
}

export default Quiz_05_Interest
