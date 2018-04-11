
import React, { Component } from 'react'
import localAPI from '../util/localAPI'
import { Form, FormField, DateTime, TextInput, Button } from 'grommet'

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
    this.props.saveQuiz({
      date: this.state.date,
      itinName: this.state.itinName
    })
    let newItin = {
      name: this.state.itinName,
      user_id: this.props.user_id,
      itin_date: this.state.date
    }
    localAPI.createItin(newItin)
    this.props.history.push('/main')
  }
  handleDateChange = (e) => {
    this.setState({date: e})
  }
  render() {
    return(
      <div>
        <Form>
          <FormField label='Name of Itinerary:' onChange={this.handleItinNameChange}>
            <TextInput id="itinName"
              name="itinName" />
          </FormField>
          <FormField>
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
