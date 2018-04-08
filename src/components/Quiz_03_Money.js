
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz_03_Money extends Component {
  saveAnswer = (e) => {
    this.props.saveQuiz({q2_money: e.target.dataset.answer})
  }
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">how much money do you want spend on this trip?<br />you can choose more than one option</h2>
          <div className="choices">
            <span onClick={this.saveAnswer} data-answer='1'>$</span>
            <span onClick={this.saveAnswer} data-answer='2'>$$</span>
            <span onClick={this.saveAnswer} data-answer='3'>$$$</span>
            <span onClick={this.saveAnswer} data-answer='4'>$$$$</span>
          </div>
        </div>
        <Link to="/quiz04"><div className="next">next</div></Link>
      </div>
    )
  }
}

export default Quiz_03_Money
