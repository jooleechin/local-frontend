
import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import SearchBar from './SearchBar'

class Quiz extends Component {
  componentDidMount() {

  }

  render() {
    const options = {
      types: ['address']
    }
    const inputProps = {
      placeholder: 'Search place...'
    }
    return(
      <div>
        <div className="QandA">
          <h2 className="question">where is your destination?</h2>
          <div className="choices">
            <SearchBar
              options={{types: ['(cities)']}}
            />
          </div>
        </div>
        <div className="QandA">
          <h2 className="question">where are you staying?</h2>
          <div className="choices">
            <SearchBar
              inputProps={inputProps}
              options={options}
            />
          </div>
        </div>
        <div className="QandA">
          <h2 className="question">what is your method of transportation?<br />(you can choose more than one option!)</h2>
          <div className="choices">
            <span>car</span>
            <span>public transit</span>
            <span>rideshare</span>
            <span>walking</span>
          </div>
        </div>
        <div className="QandA">
          <h2 className="question">when do you want an itinerary for?<br />(you can choose more than one option)</h2>
          <div className="choices">
            <span>morning</span>
            <span>afternoon</span>
            <span>evening</span>
            <span>all day</span>
          </div>
        </div>
        <div className="QandA">
          <h2 className="question">what are your interests?<br />(you can choose more than one option)</h2>
          <div className="choices">
            <span>nature</span>
            <span>instagram worthy places</span>
            <span>shopping</span>
            <span>food</span>
            <span>museums</span>
            <span>random stuff</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Quiz
