
import React, { Component } from 'react' 

class Quiz_06_Interest extends Component {
  constructor () {
    super()
    this.state = {
      isButtonActive: false,
      isButtonActive2: false,
      isButtonActive3: false,
      isButtonActive4: false,
      isButtonActive5: false,
      isButtonActive6: false
    }
    this.saveAnswer = this.saveAnswer.bind(this)
  }

  removeDup = (val, i, self) => (self.indexOf(val) === i)

  saveAnswer = (e) => {
    let interests = [...this.props.q4_interests]
    if (e.target.dataset.answer === 'nature') {
      this.setState({
        isButtonActive: !this.state.isButtonActive
      })
      interests = [...interests, 'park', 'natural_feature']
    }
    if (e.target.dataset.answer === 'cafe') {
      this.setState({
        isButtonActive2: !this.state.isButtonActive2
      })
      interests = [...interests, 'cafe']
    }
    if (e.target.dataset.answer === 'shopping') {
      this.setState({
        isButtonActive3: !this.state.isButtonActive3
      })
      interests = [...interests, 'department_store', 'shopping_mall', 'store']
    }
    if (e.target.dataset.answer === 'food') {
      this.setState({
        isButtonActive4: !this.state.isButtonActive4
      })
      interests = [...interests, 'restaurant', 'bar', 'bakery']
    }
    if (e.target.dataset.answer === 'museum') {
      this.setState({
        isButtonActive5: !this.state.isButtonActive5
      })
      interests = [...interests, 'art_gallery', 'museum']
    }
    if (e.target.dataset.answer === 'night_out') {
      this.setState({
        isButtonActive6: !this.state.isButtonActive6
      })
      interests = [...interests, 'bar', 'night_club', 'casino']
    }
    let unique = interests.filter(this.removeDup)
    this.props.saveQuiz({ q4_interests: unique })
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
        this.props.saveQuiz({radius: '45592'})
        break;
      case 'walking':
        this.props.saveQuiz({radius: '1500'})
        break;
      default:
        this.props.saveQuiz({radius: '1000'})
    }
  }

  submit = (e)  => {
    e.preventDefault()
    this.radiusCalc(this.props.q1_transport)
    this.props.history.push('/quiz07')
  }

  render() {
    return(
      <div className="marginTop">
        <form className="QandA" onSubmit={this.submit}>
          <label for="question" className="question">what are your interests? select all that apply</label>
          <div className="choices" id="q6choices">
            <span onClick={this.saveAnswer} className={this.state.isButtonActive ? 'activeButt top2' : 'top2'} data-answer='nature'>nature</span>
            <span onClick={this.saveAnswer} className={this.state.isButtonActive2 ? 'activeButt top2' : 'top2'} data-answer='cafe'>cafe</span>
            <span onClick={this.saveAnswer} className={this.state.isButtonActive3 ? 'activeButt top2' : 'top2'} data-answer='shopping'>shopping</span>
            <span onClick={this.saveAnswer} className={this.state.isButtonActive4 ? 'activeButt top2' : 'top2'} data-answer='food'>food</span>
            <span onClick={this.saveAnswer} className={this.state.isButtonActive5 ? 'activeButt bottom2' : 'bottom2'}data-answer='museum'>museum</span>
            <span onClick={this.saveAnswer} className={this.state.isButtonActive6 ? 'activeButt bottom2' : 'bottom2'}data-answer='night_out'>night out</span>
          </div>
          <input type="submit" id="loginButt1" className="submit" value="next"/>
        </form>

      </div>
    )
  }
}

export default Quiz_06_Interest
