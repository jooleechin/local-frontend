
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import StarRatingComponent from 'react-star-rating-component'

class Reviews extends Component {
  state = {
    reviews: []
  }
  componentDidMount() {
    let googlePlace_ID = this.props.googleID
    googleAPI.getPlaceID(googlePlace_ID)
    .then((res) => {
      let data = res.data.result.reviews
      this.setState({reviews: data})
    })
  }

  renderReview = () => (
    this.state.reviews.map(review => (
      <div className="tl mt2 review avenir">
        <div className="person">
          <div className="reviewDate">
            <div className="b">{review.author_name}</div>
            <div>{review.relative_time_description}</div>
          </div>
          <div>
            <StarRatingComponent
              name='rating'
              starCount={5}
              value={review.rating}
            />
          </div>
          {/*<span>{review.rating}</span>*/}
        </div>
        <div className="text">
          {review.text}
        </div>
      </div>
    ))
  )


  render() {
    return(
      <div>{this.renderReview()}</div>
    )
  }
}

export default Reviews
