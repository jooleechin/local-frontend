
import React, { Component } from 'react'
import localAPI from '../util/localAPI'
import DateTime from 'grommet/components/DateTime'
import Form from 'grommet/components/Form'
import { FormField, TextInput, Button } from 'grommet'

class Quiz_07_MakeItin extends Component {
  state = {
    date: '',
    itinName: ''
  }
  handleItinNameChange = (e) => {
    this.setState({itinName: e.target.value})
  }
  saveItinData = (e) => {
    e.preventDefault()
    let newItin = {
      name: this.state.itinName,
      user_id: this.props.user_id,
      itin_date: this.state.date,
      destination: this.props.destination
    }
    console.log(newItin, 'newitin')
    localAPI.createItin(newItin)
    .then((res) => {
      console.log(res)
      console.log(res.data.itin)
      let itin_id = res.data.itin[0].id
      this.props.saveQuiz({
        date: this.state.date,
        itinName: this.state.itinName,
        itin_id: itin_id
      })
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
        itin_id: itin_id
      }
      localAPI.createAnswer(newAnswer)
    })
    this.props.history.push('/main')
  }
  handleDateChange = (e) => {
    this.setState({date: e})
  }
  render() {
    return(
      <div className="marginTop">
        <Form className="formBox">
          <FormField className="question tl" label='Name of Itinerary:' onChange={this.handleItinNameChange}>
            <TextInput id="itinName"
              name="itinName" />
          </FormField>
          <FormField className="tl">
            <DateTime id='date'
              name='date'
              format='M/D/YYYY'
              onChange={this.handleDateChange}
              value={this.state.date} />
          </FormField>
          <Button label='submit'
            id="submitButton"
            onClick={this.saveItinData}
            primary={false}
            secondary={false}
            type='submit' />
        </Form>
      </div>
    )
  }
}

export default Quiz_07_MakeItin
