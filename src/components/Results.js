
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import localAPI from '../util/localAPI'
import placeHolderIMG from '../assests/onion.jpg'
import { Link, Route } from 'react-router-dom'
import { FormAdd, FormSchedule, FormNextLink, Subtract } from 'grommet-icons'
import Itin from './Itin'
class Results extends Component {
  state = {
    choices: [],
    choiceIndex: -1,
    photo_reference: '',
    photoUrls: [],
    interests: this.props.q4_interests,
    place_ID: '',
    order: 0
  }

  listOfChoices = (choices, photoUrls, placeid) => {
    photoUrls.forEach((url, i) => {
      choices[i].photoUrl = url
    })
    this.setState({
      choices: choices,
      choiceIndex: 0,
      photoUrls,
      place_ID: placeid
    })
  }

  addToItin = () => (
    googleAPI.getPlaceID(this.state.place_ID[this.state.choiceIndex])
    .then((result) => {
      let data = result.data.result
      console.log('1st apicall', data)
      let place = {
        name: data.name,
        address: data.formatted_address,
        lat: data.geometry.location.lat,
        long: data.geometry.location.lng,
        phone: data.formatted_phone_number,
        hours: JSON.stringify(data.opening_hours.weekday_text),
        photo: JSON.stringify(data.photos),
        rating: data.rating,
        reviews: JSON.stringify(data.reviews)
      }
      localAPI.addToItin(place)
      .then((resPlace) => {
        let place_id = resPlace.place[0].id
        let itinPlace = {
          itin_id: this.props.itin_id,
          places_id: place_id,
          order: this.state.order
        }
        console.log('inserteditinPlace', itinPlace)
        localAPI.addToItinPlaceJoin(itinPlace)
        .then((res) => {
          console.log('3rd apicall', res.data)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
  )

  showMore = (placeID) => (
    googleAPI.getPlaceID(placeID)
    .then ((result) => {
      console.log(result.data.result)
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
        place_ID: this.props.place_ID
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
    // let ratingStar = rating.split('').forEach((e) => {
    //   return <StarIcon />
    // })
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
            <h4>{formatted_address}</h4>
            <h4>{rating}</h4>
            <h4>$$</h4>
          </div>
        </div>
        <div className="bottomHalf">
          <button onClick = {() => {
                this.setState({order: this.state.order+1})
                this.addToItin()
              }
            }>
            <FormAdd />
          </button>
          <button onClick={this.goToItin}><FormSchedule /></button>
          <button onClick={this.selectNextChoice}><FormNextLink /></button>
        </div>
      </div>
    )
  }
}

export default Results
