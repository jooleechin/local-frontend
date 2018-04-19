
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz_05_Time extends Component {
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
      isButtonActive: !this.state.isButtonActive
    })
    let timeSlot = [...this.props.q3_time]
    timeSlot.push(e.target.dataset.answer)
    let unique = timeSlot.filter(this.removeDup)
    this.props.saveQuiz({q3_time: unique})
  }
  saveAnswer2 = (e) => {
    this.setState({
      isButtonActive2: !this.state.isButtonActive2
    })
    let timeSlot = [...this.props.q3_time]
    timeSlot.push(e.target.dataset.answer)
    let unique = timeSlot.filter(this.removeDup)
    this.props.saveQuiz({q3_time: unique})
  }
  saveAnswer3 = (e) => {
    this.setState({
      isButtonActive3: !this.state.isButtonActive3
    })
    let timeSlot = [...this.props.q3_time]
    timeSlot.push(e.target.dataset.answer)
    let unique = timeSlot.filter(this.removeDup)
    this.props.saveQuiz({q3_time: unique})
  }
  saveAnswer4 = (e) => {
    this.setState({
      isButtonActive4: !this.state.isButtonActive4
    })
    let timeSlot = [...this.props.q3_time]
    timeSlot.push(e.target.dataset.answer)
    let unique = timeSlot.filter(this.removeDup)
    this.props.saveQuiz({q3_time: unique})
  }
  removeDup = (val, i, self) => (self.indexOf(val) === i)

  render() {
    return(
      <div>
        <div className="QandA marginTop">
          <h2 className="question">when do you want an itinerary for? select all that apply.</h2>
          <div className="choices" id="choices3">
            <span onClick={this.saveAnswer} className={this.state.isButtonActive ? 'activeButt top2' : 'top2'} data-answer='morning'>morning</span>
            <span onClick={this.saveAnswer2} className={this.state.isButtonActive2 ? 'activeButt top2' : 'top2'} data-answer='afternoon'>afternoon</span>
            <span onClick={this.saveAnswer3} className={this.state.isButtonActive3 ? 'activeButt bottom2' : 'bottom2'} data-answer='evening'>evening</span>
            <span onClick={this.saveAnswer4} className={this.state.isButtonActive4 ? 'activeButt bottom2' : 'bottom2'} data-answer='all_day'>all day</span>
          </div>
        </div>
        <Link to="/quiz06" style={{ textDecoration: 'none' }}><input type="submit" id="loginButt1" className="submit" value="next"/></Link>
      </div>
    )
  }
}

export default Quiz_05_Time
