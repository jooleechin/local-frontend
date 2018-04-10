
import React, { Component } from 'react'
import localAPI from '../util/localAPI'

class Itin extends Component {
  componentDidMount() {
    debugger
    let itinid = this.props.itin_id
    let userid = this.props.user_id
    console.log('itin', this.props.itin_id)
    console.log('userid', this.props.user_id)
    localAPI.getCurrentItin(itinid, userid)
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
