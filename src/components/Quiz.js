
import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

class Quiz extends Component {
  componentDidMount() {

  }

  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">where is your destination?</h2>
          <div className="choices">

          </div>
        </div>
      </div>
    )
  }
}

export default Quiz
