
import React, { Component } from 'react'
import localAPI from '../util/localAPI'


class Quiz_05_Interest extends Component {
  removeDup = (val, i, self) => (self.indexOf(val) === i)
  saveAnswer = (e) => {
    let interests = [...this.props.q3_interests]
    interests.push(e.target.dataset.answer)
    let unique = interests.filter(this.removeDup)
    this.props.saveQuiz({q3_interests: unique})
  }

  submit = (e)  => {
    e.preventDefault()
    let newAnswer = {
      user_id: this.props.user_id,
      destination: this.props.destination,
      lat_stay: this.props.lat_stay,
      lng_stay: this.props.lng_stay,
      q1_transport: this.props.q1_transport,
      q2_time: this.props.q2_time.toString(),
      q3_interests: this.props.q3_interests.toString(),
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
            <span onClick={this.saveAnswer} data-answer='instagram'>instagram worthy places</span>
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

export default Quiz_05_Interest
