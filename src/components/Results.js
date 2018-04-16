
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import localAPI from '../util/localAPI'
import placeHolderIMG from '../assests/onion.jpg'
import { Link, Route } from 'react-router-dom'
import { Add, Schedule, LinkNext, Subtract } from 'grommet-icons'

import Itin from './Itin'
class Results extends Component {
  state = {
    choices: [],
    choiceIndex: -1,
    photo_reference: '',
    interests: this.props.q4_interests,
    place_ID: '',
    order: 0,
    types : []
  }

  shuffle = (choices, place_id) => {
  var match1 = choices
  var match2 = place_id
  var i=0, len= match1.length, next, order=[];
  while(i<len)order[i]= ++i;
  order.sort(function(){return Math.random()-.5});

  for(i=0; i<len; i++){
      next=order[i];
      match1.push(match1[next]);
      match2.push(match2[next]);
  }
  match1.splice(1, len);
  match2.splice(1, len);
  console.log('choices', match1)
  console.log('placeid', match2)
  return [match1, match2]
    /*
    var arrLength = 0;
    var argsLength = arguments.length;
    var rnd, tmp;
    for (var index = 0; index < argsLength; index += 1) {
      if (index === 0) {
        arrLength = arguments[0].length;
      }
      if (arrLength !== arguments[index].length) {
        throw new RangeError("Array lengths do not match.");
      }
    }
    while (arrLength) {
      rnd = Math.floor(Math.random() * arrLength);
      arrLength -= 1;
      for (var i = 0; i < argsLength; i += 1) {
        tmp = arguments[i][arrLength];
        arguments[i][arrLength] = arguments[i][rnd];
        arguments[i][rnd] = tmp;
      }
    }*/
  }

  listOfChoices = (choices, photoUrls, placeid) => {
    photoUrls.forEach((url, i) => {
      choices[i].photoUrl = url
    })
    ;[choices, placeid] = this.shuffle(choices, placeid)
    this.setState({
      choices: choices,
      choiceIndex: 0,
      place_ID: placeid
    })
  }

  addToItin = () => {
    console.log('placeid',this.state.place_ID);
    console.log('choiceindex',this.state.choiceIndex);
    googleAPI.getPlaceID(this.state.place_ID[this.state.choiceIndex])
    .then((result) => {
      console.log('this', result)
      let data = result.data.result
      console.log('1st apicall', data)
      let place = {
        name: data.name,
        address: data.formatted_address,
        lat: data.geometry.location.lat,
        long: data.geometry.location.lng,
        phone: data.formatted_phone_number,
        hours: (data.opening_hours && JSON.stringify(data.opening_hours.weekday_text)) || '',
        photo: JSON.stringify(data.photos),
        rating: data.rating,
        reviews: JSON.stringify(data.reviews),
        photoUrl: this.state.choices[this.state.choiceIndex].photoUrl,
        // photoUrl: this.state.photoUrls[this.state.choiceIndex],
        googlePlace_ID: data.place_id
      }
      localAPI.addToItin(place)
      .then((resPlace) => {
        console.log('2nd api call', resPlace)
        let place_id = resPlace.place[0].id
        let itinPlace = {
          itin_id: this.props.itin_id,
          places_id: place_id,
          order: this.state.order
        }
        localAPI.addToItinPlaceJoin(itinPlace)
        .then((res) => {
          console.log('3rd apicall', res.data)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  showMore = (placeID) => (
    this.props.history.push({
      pathname: '/detail',
      state: {
        googlePlace_ID: placeID
      }
    })
  )

  selectNextChoice = () => {
    this.setState({choiceIndex: this.state.choiceIndex+1})
  }

  goToItin = () => {
    this.props.history.push('/itin')
  }

  fetchChoices = () => {
    let arrOfCalls = this.state.interests.map(ele => {
      return googleAPI.getPlace(this.props.lat_stay, this.props.lng_stay, this.props.radius, ele, this.props.q2_money)
    })
    console.log(arrOfCalls)
    Promise.all(arrOfCalls)
    .then(responses => {
      //console.log('responses', responses)
      let data = responses.reduce((arr, res) => {
        //console.log('response', res)
        //console.log('results', res.data.results)
        return [...arr, ...res.data.results]
      }, [])
      // console.log('final flat data', data)
      // console.log(data)
      let photosPromises = data.map((data) => {
        if (data.photos === undefined ) return {}
        return googleAPI.getPhoto(data.photos[0].photo_reference)
      })
      let placeid = data.map((data) => {
        return data.place_id
      })
      return Promise.all(photosPromises)
      .then(responses => {
        let photoUrls = responses.map(response => {
          if (response === undefined || response.data === undefined) return {}
          let host = 'https://lh4.googleusercontent.com'
          return host + response.data.path
        })
        this.listOfChoices(data, photoUrls, placeid)
      })
    })
  }

  componentDidMount() {
    if (this.props.choices.length > 0) {
      return this.setState({
        choices: this.props.choices,
        choiceIndex: this.props.choiceIndex,
        place_ID: this.props.place_ID,
        photoUrls: this.props.photoUrls
      })
    }
    this.fetchChoices()
  }

  componentWillUnmount() {
    this.props.saveQuiz({
      choices: this.state.choices,
      choiceIndex: this.state.choiceIndex,
      place_ID: this.state.place_ID
    })
  }

  render() {
    let item = this.state.choices[this.state.choiceIndex]
    console.log('choice', item)
    item = item || {}
    let placeID = this.state.place_ID[this.state.choiceIndex]
    let { name, formatted_address, types, price_level, rating, photoUrl } = item

    return(
      <div className="right-half">
        <div className="topHalf" onClick={() => this.showMore(placeID)}>
          <div className="typeAndName tl">
            <h4>restaurant</h4>
            <h2>{name}</h2>
          </div>
          <div className='placeholderImg'><img src={photoUrl} alt={photoUrl}/></div>
          <div className="placeDesc tl">
            <Subtract />
            <div><span className="adddress">{formatted_address}</span></div>
            <div><span>{rating}</span></div>
            <div><span>$$</span></div>
          </div>
        </div>
        <div className="bottomHalf">
          <button onClick = {() => {
              this.setState({order: this.state.order+1})
              this.addToItin()
            }}><Add />
          </button>
          <button onClick={this.goToItin}><Schedule /></button>
          <button onClick={this.selectNextChoice}><LinkNext /></button>
        </div>
      </div>
    )
  }
}

export default Results
