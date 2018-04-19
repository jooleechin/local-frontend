
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import DetailImage from './DetailImage'
import Reviews from './Reviews'
import StarRatingComponent from 'react-star-rating-component'

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

  renderPriceLevel = () => {
    if (this.state.result.price_level === undefined) return ''
    return (
      <div>
        <StarRatingComponent
          name='money'
          starCount={4}
          editing={false}
          renderStarIcon={() => <span>$ </span>}
          value={this.state.result.price_level}
        />
      </div>
    )
  }

  render() {
    return(
      <div className="marginTop">
        <DetailImage googleID={this.state.googleID}/>
        <div className="infoReview">
          <div className="nameRatingInfo tl avenir">
            <div className="topLevelReview">
              <div className="reviewName avenir b">{this.state.result.name}</div>
              <div className="starBox">
                <StarRatingComponent
                  className="reviewRating"
                  name='rating'
                  starCount={5}
                  value={this.state.result.rating}
                />
              </div>
            </div>
            {this.renderPriceLevel}
            <div>{this.state.result.international_phone_number}</div>
            <a href={this.state.result.website}>{this.state.result.website}</a>
          </div>
          <Reviews googleID={this.state.googleID} />
        </div>
      </div>
    )
  }
}

export default DetailView
