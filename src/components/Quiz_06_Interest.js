
import React, { Component } from 'react'
import localAPI from '../util/localAPI'

class Quiz_06_Interest extends Component {
  removeDup = (val, i, self) => (self.indexOf(val) === i)
  saveAnswer = (e) => {
    let interests = [...this.props.q4_interests]
    interests.push(e.target.dataset.answer)
    let unique = interests.filter(this.removeDup)
    this.props.saveQuiz({q4_interests: unique})
  }

  radiusCalc = (transport) => {
    switch (transport) {
      case 'car':
        this.props.saveQuiz({radius: '135185'})
        break;
      case 'public_transit':
        this.props.saveQuiz({radius: '67592'})
        break;
      case 'rideshare':
        this.props.saveQuiz({radius: '67592'})
        break;
      case 'walking':
        this.props.saveQuiz({radius: '4828'})
        break;
      default:
        this.props.saveQuiz({radius: '1000'})
    }
  }

  submit = (e)  => {
    this.radiusCalc(this.props.q1_transport)
    e.preventDefault()
    let newAnswer = {
      user_id: this.props.user_id,
      destination: this.props.destination,
      lat_stay: this.props.lat_stay,
      lng_stay: this.props.lng_stay,
      radius: this.props.radius,
      q1_transport: this.props.q1_transport,
      q2_money: this.props.q2_money,
      q3_time: this.props.q3_time.toString(),
      q4_interests: this.props.q4_interests.toString(),
    }
    localAPI.createAnswer(newAnswer)
    this.props.history.push('/main')
  }

  render() {
    return(
      <div>
        <form className="QandA" onSubmit={this.submit}>
          <label for="question" className="question">what are your interests?<br />(you can choose more than one option)</label>
          <div className="choices">
            <span onClick={this.saveAnswer} data-answer='nature'>nature</span>
            <span onClick={this.saveAnswer} data-answer='instagram'>cafe</span>
            <span onClick={this.saveAnswer} data-answer='shopping'>shopping</span>
            <span onClick={this.saveAnswer} data-answer='food'>food</span>
            <span onClick={this.saveAnswer} data-answer='museums'>museums</span>
            <span onClick={this.saveAnswer} data-answer='random'>random stuff</span>
          </div>
          <input type="submit" value="submit" id="submit" />
        </form>

      </div>
    )
  }
}

export default Quiz_06_Interest
