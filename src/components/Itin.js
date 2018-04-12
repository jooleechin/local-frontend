
import React, { Component } from 'react'
import localAPI from '../util/localAPI'
import { FormPreviousLink } from 'grommet-icons'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import placeHolderIMG from '../assests/onion.jpg'


class Itin extends Component {
  state = {

  }
  goBack = () => {
    this.props.history.push('/main')
  }
  componentDidMount() {
    let itin_id = this.props.itin_id
    let user_id = this.props.user_id
    console.log('itin', this.props.itin_id)
    console.log('user_id', this.props.user_id)
    localAPI.getCurrentItin(itin_id, user_id)
    .then((res) => {
      console.log(res.data.allPlaces)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  render() {
    //let choices = this.props.history.location.state.choices
    return(
      <div className="itinBox">
        <div className="buttTitle">
          <Link to="/main"><button><FormPreviousLink /></button></Link>
          <div className="itinTitle tl">
            <span>itinerary for {/*this.props.date*/} in {/*this.props.destination*/}</span>
          </div>
        </div>
        <div class="itinContent">
          <div className="timeOfDay tl">morning</div>
          <div className="activity">
            <div className="activityImg">
              <img src={placeHolderIMG} alt={placeHolderIMG} />
            </div>
            <div className="activityDesc tl">
              <div className="name">{/*name*/}Pizza Pro</div>
              <div className="distance">walking: 5 mi | driving: 10 mi</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Itin
