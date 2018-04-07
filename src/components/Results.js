
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'

class Results extends Component {
  state = {
    choices: [],
    choiceIndex: -1,
    photo_reference: '',
    photoUrls: []
  }

  listOfChoices = (choices, photoUrls) => {
    choices = choices.filter(ele => ele.price_level === this.props.q2_money)
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
    let call1 = googleAPI.getRestaurant(this.props.lat_stay, this.props.lng_stay, this.props.radius, 'restaurant', 'asian')

    let call2 = googleAPI.getRestaurant(this.props.lat_stay, this.props.lng_stay, this.props.radius, 'restaurant', 'italian')

    Promise.all([call1, call2])
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
        return googleAPI.getPhoto(data.photos[0].photo_reference)
      })
      return Promise.all(photosPromises)
      .then(responses => {
        /*if (!responses || !responses[0] || !responses[0].data) {
          return
        }*/
        let photoUrls = responses.map(response => {
          let host = 'https://lh4.googleusercontent.com'
          return host + response.data.path
        })
        this.listOfChoices(data, photoUrls)
      })
      // this.listOfChoices(data)
    })

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

  render() {
    console.log('state', this.state)
    let item = this.state.choices[this.state.choiceIndex]
    item = item || {}
    let { name, icon, vicinity, photos, price_level, rating } = item
    photos = photos || []
    let photoUrl = (this.state.photoUrls.length > 0) && this.state.photoUrls[0]
    return(
      <div className="right-half">
        {name}
        {rating}
        <img src={photoUrl}/>
      </div>
    )
  }
}

export default Results
