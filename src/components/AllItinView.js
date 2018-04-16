
import React, { Component } from 'react'
import localAPI from '../util/localAPI'
const moment = require('moment')

class AllItinView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allItins: [],
      index: -1
    }
  }

  viewItin = (e) => {
    let itinId = e.target.dataset.id
    this.props.saveQuiz({itin_id: itinId})
    this.props.history.push('/itin')
  }

  newRow = () => {
    return this.state.allItins.map(itin => {
      let itinId = itin.id
      itin = {
        name: itin.name,
        destination: itin.destination,
        itin_date: moment(itin.itin_date).format('l')
      }
      let tdElements = Object.keys(itin).map(key => <td className="tc" data-id={itinId} >{itin[key]}</td>)
      return <tr data-id={itinId} onClick={this.viewItin} className="calisto stripe-dark">{tdElements}</tr>
    })
  }

  componentDidMount() {
    localAPI.getAllItinByUser(this.props.user_id)
    .then((res) => {
      this.setState({allItins: res.itin})
    })
    .catch(err =>{
      console.log(err)
    })
  }

  render() {
    return(
      <div>
        <div className="tableTitle avenir"><h2>all itineraries</h2></div>
        <table className="f6 w-100 mw8 center">
        <thead>
          <tr className='avenir fw4'>
            <th className="fw6 pa3 bg-white tc">Name</th>
            <th className="fw6 pa3 bg-white tc">city</th>
            <th className="fw6 pa3 bg-white tc">Date</th>
          </tr>
        </thead>
        <tbody className="striped--near-white:nth-child(odd) lh-copy">
           {this.newRow()}
        </tbody>
        </table>
      </div>
    )
  }
}

export default AllItinView
