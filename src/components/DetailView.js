
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import DetailImage from './DetailImage'
import Reviews from './Reviews'

class DetailView extends Component {
  state = {
    result: [],
    googleID: ''
  }

  componentWillMount() {
    let googlePlace_ID = this.props.history.location.state.googlePlace_ID
    console.log(googlePlace_ID)
    this.setState({googleID: googlePlace_ID})
  }

  componentDidMount() {
    let googlePlace_ID = this.props.history.location.state.googlePlace_ID
    googleAPI.getPlaceID(googlePlace_ID)
    .then((res) => {
      this.setState({
        result: res.data.result
      })
    })
  }

  goToResults = () => {
    this.props.history.push('/main')
  }

  render() {
    return(
      <div className="marginTop">
        <DetailImage googleID={this.state.googleID}/>
        <div className="nameRatingInfo tl">
          <div>{this.state.result.name}</div>
          <div>{this.state.result.rating}</div>
          <div>{this.state.result.price_level}</div>
          <div>{this.state.result.international_phone_number}</div>
          <a href={this.state.result.website}>{this.state.result.website}</a>
        </div>
        <Reviews googleID={this.state.googleID} />
      </div>
    )
  }
}

export default DetailView
