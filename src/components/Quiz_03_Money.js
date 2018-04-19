
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz_03_Money extends Component {
  constructor () {
    super()
    this.state = {
      isButtonActive: false,
      isButtonActive2: false,
      isButtonActive3: false,
      isButtonActive4: false
    }
    this.saveAnswer = this.saveAnswer.bind(this)
  }

  saveAnswer = (e) => {
    this.setState({
      isButtonActive: true,
      isButtonActive2: false,
      isButtonActive3: false,
      isButtonActive4: false
    })
    this.props.saveQuiz({q2_money: e.target.dataset.answer})
  }
  saveAnswer2 = (e) => {
    this.setState({
      isButtonActive: false,
      isButtonActive2: true,
      isButtonActive3: false,
      isButtonActive4: false,
    })
    this.props.saveQuiz({q2_money: e.target.dataset.answer})
  }
  saveAnswer3 = (e) => {
    this.setState({
      isButtonActive: false,
      isButtonActive2: false,
      isButtonActive3: true,
      isButtonActive4: false
    })
    this.props.saveQuiz({q2_money: e.target.dataset.answer})
  }
  saveAnswer4 = (e) => {
    this.setState({
      isButtonActive: false,
      isButtonActive2: false,
      isButtonActive3: false,
      isButtonActive4: true
    })
    this.props.saveQuiz({q2_money: e.target.dataset.answer})
  }
  render() {
    return(
      <div>
        <div className="QandA marginTop">
          <h2 className="question">how much money do you want to spend on this trip?</h2>
          <div className="choices" id="q3choices">
            <span onClick={this.saveAnswer} className={this.state.isButtonActive ? 'activeButt' : null} data-answer='1'>$</span>
            <span onClick={this.saveAnswer2} className={this.state.isButtonActive2 ? 'activeButt' : null} data-answer='2'>$$</span>
            <span onClick={this.saveAnswer3} className={this.state.isButtonActive3 ? 'activeButt' : null} data-answer='3'>$$$</span>
            <span onClick={this.saveAnswer4} className={this.state.isButtonActive4 ? 'activeButt' : null} data-answer='4'>$$$$</span>
          </div>
        </div>
        <Link to="/quiz04" style={{ textDecoration: 'none' }}><input type="submit" id="loginButt1" className="submit" value="next"/></Link>
      </div>
    )
  }
}

export default Quiz_03_Money
