
import React, { Component } from 'react'
import localAPI from '../util/localAPI'

class Quiz_06_Interest extends Component {

  removeDup = (val, i, self) => (self.indexOf(val) === i)

  saveAnswer = (e) => {
    let interests = [...this.props.q4_interests]
    if (e.target.dataset.answer === 'nature') {
      interests = [...interests, 'park', 'natural_feature']
    }
    if (e.target.dataset.answer === 'coffee') {
      interests = [...interests, 'cafe']
    }
    if (e.target.dataset.answer === 'shopping') {
      interests = [...interests, 'department_store', 'shopping_mall', 'store']
    }
    if (e.target.dataset.answer === 'food') {
      interests = [...interests, 'restaurant', 'cafe', 'bar', 'bakery']
    }
    if (e.target.dataset.answer === 'museum') {
      interests = [...interests, 'art_gallery', 'museum']
    }
    if (e.target.dataset.answer === 'night_out') {
      interests = [...interests, 'bar', 'night_club', 'casino']
    }
    let unique = interests.filter(this.removeDup)
    this.props.saveQuiz({
      q4_interests: unique
    })
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
    e.preventDefault()
    this.radiusCalc(this.props.q1_transport)
    // let newAnswer = {
    //   user_id: this.props.user_id,
    //   destination: this.props.destination,
    //   lat_stay: this.props.lat_stay,
    //   lng_stay: this.props.lng_stay,
    //   radius: this.props.radius,
    //   q1_transport: this.props.q1_transport,
    //   q2_money: this.props.q2_money,
    //   q3_time: this.props.q3_time.toString(),
    //   q4_interests: this.props.q4_interests.toString()
    // }
    // localAPI.createAnswer(newAnswer)
    this.props.history.push('/quiz07')
  }

  render() {
    return(
      <div className="marginTop">
        <form className="QandA" onSubmit={this.submit}>
          <label for="question" className="question">what are your interests? select all that apply</label>
          <div className="choices" id="q6choices">
            <span onClick={this.saveAnswer} className="top2" data-answer='nature'>nature</span>
            <span onClick={this.saveAnswer} className="top2" data-answer='coffee'>coffee</span>
            <span onClick={this.saveAnswer} className="top2" data-answer='shopping'>shopping</span>
            <span onClick={this.saveAnswer} className="top2" data-answer='food'>food</span>
            <span onClick={this.saveAnswer} className="bottom2" data-answer='museum'>museum</span>
            <span onClick={this.saveAnswer} className="bottom2" data-answer='night_out'>night out</span>
          </div>
          <input type="submit" value="next" className="submit"/>
        </form>

      </div>
    )
  }
}

export default Quiz_06_Interest
