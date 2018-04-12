
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
    localAPI.createItin(newItin)
    .then((res) => {
      console.log('result.data',res.data.itin[0])
      let itin_id = res.data.itin[0].id
      console.log('itin_id',itin_id)
      this.props.saveQuiz({
        date: this.state.date,
        itinName: this.state.itinName,
        itin_id: itin_id
      })
    })
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
