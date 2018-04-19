
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import localAPI from '../util/localAPI'
import placeHolderIMG from '../assests/onion.jpg'
import { Link, Route } from 'react-router-dom'
import { Add, Schedule, LinkNext, Subtract, Currency } from 'grommet-icons'
import StarRatingComponent from 'react-star-rating-component';

import Itin from './Itin'
class Results extends Component {
  state = {
    choices: [],
    choiceIndex: -1,
    photo_reference: '',
    interests: this.props.q4_interests,
    place_ID: '',
    order: 0,
    types : [],
    isButtonActive: false,
    isButtonActive2: false,
    isButtonActive3: false
  }

  checkActive = () => {
    this.setState({
      isButtonActive: !this.state.isButtonActive
    })
  }
  checkActive2 = () => {
    this.setState({
      isButtonActive2: !this.state.isButtonActive2
    })
  }
  checkActive3 = () => {
    this.setState({
      isButtonActive3: !this.state.isButtonActive3
    })
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
  match1.splice(1, len)
  match2.splice(1, len)
  return [match1, match2]
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

  showMore = (placeID) => {
    let path = this.props.location.pathname
    if (path === '/viewall/main') {
      this.props.history.push({
        pathname: '/viewall/main/detail',
        state: {
          googlePlace_ID: placeID
        }
      })
    }
    if (path === '/main') {
      this.props.history.push({
        pathname: '/main/detail',
        state: {
          googlePlace_ID: placeID
        }
      })
    }
  }

  selectNextChoice = () => {
    this.setState({choiceIndex: this.state.choiceIndex+1})
  }

  goToItin = () => {
    let path = this.props.location.pathname
    // if (path === '/viewall/main') return this.props.history.push('/viewall/main/detail')
    // if (path === '/viewall/itin/detail') return this.props.history.push('/itin')
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
        photoUrls: this.props.photoUrls,
        order: this.props.order
      })
    }
    this.fetchChoices()
  }

  componentWillUnmount() {
    this.props.saveQuiz({
      choices: this.state.choices,
      choiceIndex: this.state.choiceIndex,
      place_ID: this.state.place_ID,
      order: this.state.order
    })
  }

  renderPriceLevel = (pricelevel) => {
    if (pricelevel === undefined) return ''
    return (
      <div>
        <StarRatingComponent
          name='money'
          starCount={4}
          editing={false}
          renderStarIcon={() => <span>$ </span>}
          value={pricelevel}
        />
      </div>
    )
  }

  render() {
    let item = this.state.choices[this.state.choiceIndex]
    console.log('choice', item)
    item = item || {}
    let placeID = this.state.place_ID[this.state.choiceIndex]
    let { name, formatted_address, types, price_level, rating, photoUrl } = item
    const style = {
      backgroundImage: `url(${photoUrl})`,
      backgroundRepeat: 'norepeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }
    for (var type in types) {
      if (types[type] === 'bar' || types[type] === 'night_club' || types[type] === 'casino'){
        types = 'night out'
      }
      if (types[type] === 'art_gallery' || types[type] === 'museum'){
        types = 'museum'
      }
      if (types[type] === 'restaurant' || types[type] === 'bakery'){
        types = 'food'
      }
      if (types[type] === 'restaurant' || types[type] === 'bakery'){
        types = 'food'
      }
      if (types[type] === 'department_store' || types[type] === 'shopping_mall' || types[type] === 'store'){
        types = 'shopping'
      }
      if (types[type] === 'cafe'){
        types = 'cafe'
      }
      if (types[type] === 'park' || types[type] === 'natural_feature'){
        types = 'nature'
      }
    }
    const theme = {
      icon: {
        color: 'black'
      }
    }
    return(
      <div className="right-halfBox">
      <div className="right-half">
        <div className="topHalf" onClick={() => this.showMore(placeID)}>
          <div className="typeAndName tl">
            <h4>{types}</h4>
            <h2>{name}</h2>
          </div>
          <div className='placeholderImg' style={style}></div>
          <div className="placeDesc tl">
            <Subtract theme={theme}/>
            <div><span className="adddress">{formatted_address}</span></div>
            <div>
              <StarRatingComponent
                name='rating'
                starCount={5}
                value={rating}
              />
            </div>
            <div>
              {this.renderPriceLevel(price_level)}
            </div>
          </div>
        </div>
        <div className="bottomHalf">
        <div className="bottomHalfContent">
          <button className={this.state.isButtonActive ? "activeStyle" : 'notActive'}onClick = {() => {
              this.setState({order: this.state.order+1})
              this.addToItin()
              this.checkActive()
            }}><Add theme={theme}/>
            <span className="buttDesc b pt2">add place</span>
          </button>
          <button className={this.state.isButtonActive2 ? "activeStyle" : 'notActive'} onClick={() => {
            this.goToItin()
            this.setState({
              isButtonActive: false,
              isButtonActive2: false,
              isButtonActive3: false
            })
            this.checkActive2()
          }}><Schedule theme={theme}/>
            <span className="buttDesc b pt2">view itinerary</span>
          </button>
          <button className={this.state.isButtonActive3 ? "activeStyle" : 'notActive'} onClick={() => {
              this.selectNextChoice()
              this.checkActive3()
              this.setState({
                isButtonActive: false,
                isButtonActive2: false,
                isButtonActive3: false
              })
            }}><LinkNext theme={theme}/>
            <span className="buttDesc b pt2">next</span>
          </button>
        </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Results
