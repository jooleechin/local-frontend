
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_03_Transport extends Component {
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">what is your method of transportation?<br />(you can choose more than one option!)</h2>
          <div className="choices">
            <span>car</span>
            <span>public transit</span>
            <span>rideshare</span>
            <span>walking</span>
          </div>
        </div>
        <Link to="/quiz04"><div className="next">next</div></Link>
      </div>
    )
  }
}

export default Quiz_03_Transport
