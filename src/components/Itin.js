
import React, { Component } from 'react'
import localAPI from '../util/localAPI'

class Itin extends Component {
  componentDidMount() {
    debugger
    let itin_id = this.props.itin_id
    let user_id = this.props.user_id
    console.log('itin', this.props.itin_id)
    console.log('user_id', this.props.user_id)
    localAPI.getCurrentItin(itin_id, user_id)
    .then((res) => {
      debugger
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  render() {
    return(
      <div>
        
        hi
      </div>
    )
  }
}

export default Itin
