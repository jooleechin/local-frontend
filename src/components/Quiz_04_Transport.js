
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz_04_Transport extends Component {
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
    this.props.saveQuiz({q1_transport: e.target.dataset.answer})
  }
  saveAnswer2 = (e) => {
    this.setState({
      isButtonActive: false,
      isButtonActive2: true,
      isButtonActive3: false,
      isButtonActive4: false,
    })
    this.props.saveQuiz({q1_transport: e.target.dataset.answer})
  }
  saveAnswer3 = (e) => {
    this.setState({
      isButtonActive: false,
      isButtonActive2: false,
      isButtonActive3: true,
      isButtonActive4: false
    })
    this.props.saveQuiz({q1_transport: e.target.dataset.answer})
  }
  saveAnswer4 = (e) => {
    this.setState({
      isButtonActive: false,
      isButtonActive2: false,
      isButtonActive3: false,
      isButtonActive4: true
    })
    this.props.saveQuiz({q1_transport: e.target.dataset.answer})
  }

  render() {
    return(
      <div>
        <div className="QandA marginTop">
          <h2 className="question">what is your method of transportation?</h2>
          <div className="choices" id="choices2">
            <span onClick={this.saveAnswer} className={this.state.isButtonActive ? 'activeButt top2' : 'top2'} data-answer='car'>car</span>
            <span onClick={this.saveAnswer2} className={this.state.isButtonActive2 ? 'activeButt top2' : 'top2'} data-answer='public_transit'>public transit</span>
            <span onClick={this.saveAnswer3} className={this.state.isButtonActive3 ? 'activeButt bottom2' : 'bottom2'} data-answer='rideshare'>rideshare</span>
            <span onClick={this.saveAnswer4} className={this.state.isButtonActive4 ? 'activeButt bottom2' : 'bottom2'} data-answer='walking'>walking</span>
          </div>
        </div>
        <Link to="/quiz05" style={{ textDecoration: 'none' }}><input type="submit" id="loginButt1" className="submit" value="next"/></Link>
      </div>
    )
  }
}

export default Quiz_04_Transport
