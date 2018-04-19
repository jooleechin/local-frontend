
import React, { Component } from 'react'
import localAPI from '../util/localAPI'
import { FormPreviousLink, Edit, FormClose } from 'grommet-icons'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import placeHolderIMG from '../assests/onion.jpg'
import Image from 'grommet/components/Image'
import TrashButton from './TrashButton'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const moment = require('moment')

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// using some little inline style helpers to make the app look okay
const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // marginBottom: grid,

  // change background colour if dragging
  background: isDragging ? 'none' : 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightgrey' : 'none',
  width: '100%',
});


class Itin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allActivity: [],
      time: "",
      date: '',
      destination: '',
      editIsHidden: true,
      itin_id: 0,
      lat2: 0,
      lng2: 0,
    }
    this.toggleEditHidden = this.toggleEditHidden.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  toggleEditHidden () {
    this.setState(prevState => ({
      editIsHidden: !prevState.editIsHidden
    }))
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.allActivity,
      result.source.index,
      result.destination.index
    );
    this.setState({
      allActivity: items
    });
  }

  showMore = (e) => {
    let googlePlace_ID = e.target.dataset.answer
    let path = this.props.location.pathname
    if (path === '/viewall/itin') {
      this.props.history.push({
        pathname: '/viewall/itin/detail',
        state: { googlePlace_ID }
      })
    }
    if (path === '/itin') {
      this.props.history.push({
        pathname: '/detail',
        state: { googlePlace_ID }
      })
    }
  }

  deletePlace = (e) => {
    let place_ID = e.target.dataset.placeid
    localAPI.deletePlace(place_ID).then(deletedPlace => {
      let allActivity = this.state.allActivity.filter(place => place.places_id !== deletedPlace.data.place.id)
      this.setState({allActivity})
    })
    .catch(err => {
      console.log(err)
    })
  }

  calcDistance = (lat1, lng1) => {
    let lat2 = this.state.lat2
    let lng2 = this.state.lng2
    let radlat1 = Math.PI * lat1/180
  	let radlat2 = Math.PI * lat2/180
  	let theta = lat1-lat2
  	let radtheta = Math.PI * theta/180
  	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  	dist = Math.acos(dist)
  	dist = dist * (180/Math.PI) * 60 * 1.1515
    dist = Math.round(dist * 100) / 100

    // let newActivity = this.state.allActivity.forEach((activity) => {
    //   activity.distance = dist
    // })
    // console.log(this.state.allActivity)
    return dist
  }

  newActivity = () => {
    return this.state.allActivity.map((activity, index) => (
      <Draggable key={activity.order} draggableId={activity.order} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={getItemStyle(
              provided.draggableProps.style,
              snapshot.isDragging
            )}
            {...provided.dragHandleProps}
          >
            <div className="activity" data-answer={activity.googlePlace_ID}>
              <div className="activityImg" data-answer={activity.googlePlace_ID} onClick={this.showMore}>
                <Image src={activity.photoUrl}
                  alt={activity.photoUrl}
                  full={true}
                  fit='contain'
                  size='thumb'
                  data-answer={activity.googlePlace_ID}
                  />
              </div>
              <div className="activityDesc tl avenir" onClick={this.showMore}>
                <div className="name" data-answer={activity.googlePlace_ID}>{activity.places_name}</div>
                <div className="distance" data-answer={activity.googlePlace_ID}>distance:{this.calcDistance( Number(activity.lat), Number(activity.long) )} mi</div>
              </div>
              <button><FormClose onClick={this.deletePlace} data-placeid={activity.places_id}/></button>
            </div>
          </div>
        )}
      </Draggable>
    ))
  }

  newTimeOfDay = () => {
    let timeArr = this.state.time.split(',')
    // timeArr.forEach(time => (
    //   if (time == 'morning')
    // ))
    return timeArr.map(time => (
        <div className="itinContent timeOfDay tl">{time}
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div className="timeBox"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver) }
              >
                {this.newActivity()}
              </div>
            )}
          </Droppable>
        </div>
    ))
  }

  componentDidMount() {
    let itin_id = this.props.itin_id
    let user_id = this.props.user_id
    localAPI.getCurrentItin(itin_id, user_id)
    .then((res) => {
      this.setState({
        allActivity: res,
        date: moment(res[0].itin_date).format('l')
      })
      localAPI.getActivity(itin_id)
      .then((res) => {
        let split = res.destination.split(',')
        let newDest = split[0]
        console.log(res)
        this.setState({
          itin_id: res.itin_id,
          time: res.q3_time,
          destination: newDest
        })
        localAPI.getQuestionByUserAndItin(this.props.user_id, this.props.itin_id)
        .then((res) => {
          this.setState({
            lat2 : res.lat_stay,
            lng2 : res.lng_stay
          })
        })//end of third .then
        .catch(err => console.log(err))
      })//end of second .then
    })//end of first .then
    .catch(err => console.log(err))
  }
  render() {
    console.log('itin state', this.state)
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="itinBox marginTop">
          <div className="buttTitle">
            <div className="itinTitle tl">
              <span>itinerary for <span className="titleKey">{this.state.date}</span> in <span className="titleKey">{this.state.destination}</span></span>
            </div>
          </div>
          <div className="itineraryBox">
            {console.log(this.state.allActivity)}
            {this.newTimeOfDay()}
          </div>

        </div>
        <TrashButton itin_id={this.state.itin_id} history={this.props.history}/>
      </ DragDropContext>
    )
  }
}

export default Itin
