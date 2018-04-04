
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_01_Destination extends Component {
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">where is your destination?</h2>
          <div className="choices">
            <SearchBar
              placeholder='Search cities...'
              options={{types: ['(cities)']}}
            />
          </div>
        </div>
        <Link to="/quiz02"><div className="next">next</div></Link>
      </div>
    )
  }
}

export default Quiz_01_Destination
