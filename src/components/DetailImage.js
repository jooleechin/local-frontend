
import React, { Component } from 'react'
import googleAPI from '../util/googleAPI'
import { FormPrevious, FormNext } from 'grommet-icons'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class DetailImage extends Component {
  state = {
    result: [],
    photoUrls: [],
    googlePlace_ID: '',
    number: 0,
    photoLength: 0
  }
  concatPhotoURL = (data, photoUrls) => {
    let length = data.photos.length
    this.setState({
      result: data,
      photoUrls,
      photoLength: length
    })
  }
  componentDidMount() {
    let googlePlace_ID = this.props.googleID
    console.log('googlePlace_ID', this.props, googlePlace_ID)
    googleAPI.getPlaceID(googlePlace_ID)
    .then ((result) => {
      let data = result.data.result
      console.log(result.data.result)
      let photosPromise = data.photos.map((photo) => {
        if (photo.photo_reference === undefined) return {}
        return googleAPI.getPhoto(photo.photo_reference)
      })
      return Promise.all(photosPromise)
      .then (responses => {
        let photoUrls = responses.map(response => {
          if (response === undefined || response.data === undefined) return {}
          let host = 'https://lh4.googleusercontent.com'
          return host + response.data.path
        })
        this.concatPhotoURL(data, photoUrls)
      })
    })
  }
  renderImage = () => {
    let counter = this.state.number
    return this.state.photoUrls.map(photo => {
      counter++
      return <Slide index={counter}><img src={photo} alt={photo} /></Slide>
    })
  }

  render() {
    const theme = {
      icon: {
        color: 'white'
      }
    }
    return(
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={70}
        totalSlides={this.state.photoLength}
        orientation='horizontal'
        visibleSlides={1}
        >
        <Slider>
          {this.renderImage()}
        </Slider>
        <div className='butts'>
          <ButtonBack className="oneButt"><FormPrevious theme={theme}/></ButtonBack>
          <ButtonNext className="oneButt"><FormNext theme={theme}/></ButtonNext>
        </div>
      </CarouselProvider>
    )
  }
}

export default DetailImage
