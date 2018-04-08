
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'

class Results extends Component {
  state = {
    choices: [],
    choiceIndex: -1,
    photo_reference: '',
    photoUrls: [],
    interests: this.props.q4_interests
  }

  listOfChoices = (choices, photoUrls) => {
    photoUrls.forEach((url, i) => {
      choices[i].photoUrl = url
    })
    // choices = choices.filter(ele => ele.price_level === this.props.q2_money)
    this.setState({
      choices: choices,
      choiceIndex: 0,
      photoUrls
    })
    // console.log(choices)
  }

  selectNextChoice = () => {
    this.setState({choiceIndex: this.state.choiceIndex+1})
  }

  componentDidMount() {
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
      console.log(data)
      let photosPromises = data.map((data) => {
        if (data.photos === undefined ) return {}
        return googleAPI.getPhoto(data.photos[0].photo_reference)
      })
      console.log('photoprom', photosPromises)
      return Promise.all(photosPromises)
      .then(responses => {
        /*if (!responses || !responses[0] || !responses[0].data) {
          return
        }*/
        let photoUrls = responses.map(response => {
          if (response === undefined || response.data === undefined) return {}
          let host = 'https://lh4.googleusercontent.com'
          return host + response.data.path
        })
        this.listOfChoices(data, photoUrls)
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
// {{this.state.photos}.forEach(photo => {
//   return <img src=photo />
// }) }
// {name}
// {address}
// {hours}
// <img src={icon} />
// {price_level}
// {rating}
//
//
// <Button onClick={this.selectNextChoice} />


// <div className="right-half">
//   {name}
//   {rating}
//   <img src={photoUrl} alt={photoUrl}/>
//   <img src='../assests/noPhoto.png' alt={photoUrl}/>
//   {price_level}
//   {icon}
//   {vicinity}
//   <button onClick={this.selectNextChoice}>NEXT</button>
// </div>

  render() {
    // console.log('state', this.state)
    let item = this.state.choices[this.state.choiceIndex]
    // console.log('choice', item)
    item = item || {}
    let { name, icon, vicinity, price_level, rating, photoUrl } = item
    return(
      <div className="right-half">
        <div className='placeholderImg'> </div>
        <div className="placeDesc tl">
          <div className='placeName'><h3>Monsoon Seattle</h3></div>
          <div className='address'><h4>400 12th Ave E Seattle, WA 98102</h4></div>
          <div className="rating"><h4>&#9733;	&#9733;	&#9733;</h4></div>
          <div className="price_level"><h4>$$</h4></div>
        </div>
      </div>
    )
  }
}

export default Results
