
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import localAPI from '../util/localAPI'
import { FormSubtractIcon, LocationPinIcon, ScheduleIcon, StarIcon, NextIcon } from 'grommet'

class Results extends Component {
  state = {
    choices: [],
    choiceIndex: -1,
    photo_reference: '',
    photoUrls: [],
    interests: this.props.q4_interests,
    place_ID: '',

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
    let place = {

    }
    localAPI.addToItin(place)
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

  componentDidMount() {
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
      console.log(data)
      let photosPromises = data.map((data) => {
        if (data.photos === undefined ) return {}
        return googleAPI.getPhoto(data.photos[0].photo_reference)
      })
      let placeid = data.map((data) => {
        return data.place_id
      })
      console.log('photoprom', photosPromises)
      return Promise.all(photosPromises)
      .then(responses => {
        let photoUrls = responses.map(response => {
          if (response === undefined || response.data === undefined) return {}
          let host = 'https://lh4.googleusercontent.com'
          return host + response.data.path
        })
        this.listOfChoices(data, photoUrls, placeid)
      })
      // this.listOfChoices(data)
    })

    // let call1 = googleAPI.getPlace(this.props.lat_stay, this.props.lng_stay, this.props.radius, this.props.q4_interests, this.props.q2_money)

    // let call2 = googleAPI.getPlace(this.props.lat_stay, this.props.lng_stay, this.props.radius, 'restaurant', 'italian')
    //
    // Promise.all([call1, call2])
    // .then(responses => {
    //   //console.log('responses', responses)
    //   let data = responses.reduce((arr, res) => {
    //     //console.log('response', res)
    //     //console.log('results', res.data.results)
    //     return [...arr, ...res.data.results]
    //   }, [])
    //   // console.log('final flat data', data)
    //   console.log(data)
    //   let photosPromises = data.map((data) => {
    //     return googleAPI.getPhoto(data.photos[0].photo_reference)
    //   })
    //   return Promise.all(photosPromises)
    //   .then(responses => {
    //     /*if (!responses || !responses[0] || !responses[0].data) {
    //       return
    //     }*/
    //     let photoUrls = responses.map(response => {
    //       let host = 'https://lh4.googleusercontent.com'
    //       return host + response.data.path
    //     })
    //     this.listOfChoices(data, photoUrls)
    //   })
    //   // this.listOfChoices(data)
    // })

  }

  render() {
    // console.log('state', this.state)
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
            <FormSubtractIcon />
            <div className='address'><h4>{formatted_address}</h4></div>
            <div className="rating">{rating}</div>
            <div className="price_level"><h4>$$</h4></div>
          </div>
        </div>
        <div className="bottomHalf">
          <button onClick={this.addToItin}>
            <LocationPinIcon />
          </button>
          <button><ScheduleIcon /></button>
          <button onClick={this.selectNextChoice}><NextIcon /></button>
        </div>
      </div>
    )
  }
}

export default Results
