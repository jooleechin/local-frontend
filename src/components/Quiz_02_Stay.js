
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_02_Stay extends Component {
  render() {
    return(
      <div>
        <div className="QandA">
          <h2 className="question">where are you staying?</h2>
          <div className="choices">
            <SearchBar
              placeholder='Search places...'
            />
          </div>
        </div>
        <Link to="/quiz03"><div className="next">next</div></Link>
      </div>
    )
  }
}

export default Quiz_02_Stay
