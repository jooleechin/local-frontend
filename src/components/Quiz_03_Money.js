
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
          <h2 className="question">how much money do you want to spend on this trip?</h2>
          <div className="choices" id="q3choices">
            <span onClick={this.saveAnswer} className="pointer" data-answer='1'>$</span>
            <span onClick={this.saveAnswer} data-answer='2'>$$</span>
            <span onClick={this.saveAnswer} data-answer='3'>$$$</span>
            <span onClick={this.saveAnswer} data-answer='4'>$$$$</span>
          </div>
        </div>
        <Link to="/quiz04" style={{ textDecoration: 'none' }}><div className="next submit">next</div></Link>
      </div>
    )
  }
}

export default Quiz_03_Money
