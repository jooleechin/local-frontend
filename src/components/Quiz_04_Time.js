
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_04_Time extends Component {
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">when do you want an itinerary for?<br />(you can choose more than one option)</h2>
          <div className="choices">
            <span>morning</span>
            <span>afternoon</span>
            <span>evening</span>
            <span>all day</span>
          </div>
        </div>
        <Link to="/quiz05"><div className="next">next</div></Link>
      </div>
    )
  }
}

export default Quiz_04_Time
