
import React, { Component } from 'react'
import localAPI from '../util/localAPI'
import { FormPreviousLink, Edit } from 'grommet-icons'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import placeHolderIMG from '../assests/onion.jpg'
import Image from 'grommet/components/Image'
import TrashButton from './TrashButton'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const moment = require('moment')

class Itin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allActivity: [],
      time: "",
      date: '',
      destination: '',
      editIsHidden: true,
      itin_id: 0
    }
    this.toggleEditHidden = this.toggleEditHidden.bind(this)
  }
  toggleEditHidden () {
    this.setState(prevState => ({
      editIsHidden: !prevState.editIsHidden
    }))
  }
  goBack = () => {
    this.props.history.push('/main')
  }
  showMore = (e) => {
    debugger
    console.log(this)
    console.log(this.dataset)
    let googlePlace_ID = e.target.dataset.answer
    this.props.history.push({
      pathname: '/detail',
      state: { googlePlace_ID }
    })
  }

  newActivity = () => {
    return this.state.allActivity.map(activity => (
      <div className="activity" data-answer={activity.googlePlace_ID} onClick={this.showMore}>
        <div className="activityImg" data-answer={activity.googlePlace_ID}>
          <Image src={activity.photoUrl}
            alt={activity.photoUrl}
            full={true}
            fit='contain'
            size='thumb'
            data-answer={activity.googlePlace_ID}
             />
        </div>
        <div className="activityDesc tl" data-answer={activity.googlePlace_ID}>
          <div className="name" data-answer={activity.googlePlace_ID}>{activity.places_name}</div>
          <div className="distance" data-answer={activity.googlePlace_ID}>distance: 5 mi</div>
        </div>
      </div>
    ))
  }

  newTimeOfDay = () => {
    let timeArr = this.state.time.split(',')
    return timeArr.map(time => (
      <div className="itinContent timeOfDay tl">{time}
        {this.newActivity()}
      </div>
    ))
  }

  componentDidMount() {
    let itin_id = this.props.itin_id
    let user_id = this.props.user_id
    localAPI.getCurrentItin(itin_id, user_id)
    .then((res) => {
      console.log(res)
      this.setState({
        allActivity: res,
        date: moment(res[0].itin_date).format('l')
      })
      localAPI.getActivity(itin_id)
      .then((res) => {
        console.log(res)
        let split = res.destination.split(',')
        let newDest = split[0]
        this.setState({
          itin_id: res.itin_id,
          time: res.q3_time,
          destination: newDest
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  render() {
    return(
      <div className="itinBox">
        <div className="buttTitle">
          <div className="itinTitle tl">
            <span>itinerary for <span className="titleKey">{this.state.date}</span> in <span className="titleKey">{this.state.destination}</span></span>
          </div>
        </div>
        <div className="itineraryBox">
          <button className="itinEditButt" onClick={this.toggleEditHidden}><Edit />

          </button>
          {this.newTimeOfDay()}
        </div>
        <TrashButton itin_id={this.state.itin_id}/>
      </div>
    )
  }
}

export default Itin
