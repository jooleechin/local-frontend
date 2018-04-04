
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

class Quiz_05_Interest extends Component {
  render() {
    return(
      <div>
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
        <div className="submit">submit</div>
      </div>
    )
  }
}

export default Quiz_05_Interest
