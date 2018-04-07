
import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="render_item">
    <i className="fa fa-map-marker location_icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
)

const cssClasses = {
  root: 'search_form',
  input: 'search_input',
  autocompleteContainer: 'autocomplete-container',
}

const shouldFetchSuggestions = ({ value }) => value.length > 1

const onError = (status, clearSuggestions) => {
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  );
  clearSuggestions();
};

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('latlang success!!', { lat, lng })
        this.props.send(lat, lng) //passing down the function from q2 so that i can access
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
      })

      .catch (err => {
        console.log('error!', err)
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(err),
          loading: false
        })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    })
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    );
  }

  renderGeocodeSuccess(lat, lng) {
    console.log('whatsup')
    // return (
    //   <div className="alert alert-success" role="alert">
    //     <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
    //     <strong>
    //       {lat}, {lng}
    //     </strong>
    //   </div>
    // );
  }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        console.log('Blur event!')
      },
      onFocus: () => {
        console.log('Focused!')
      },
      autoFocus: true,
      placeholder: this.props.placeholder,
      name: 'search_input',
      id: 'my-input-id',
    }
    return (
      <div>
        <div className="searchBar">
          <PlacesAutocomplete
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            classNames={cssClasses}
            onSelect={this.handleSelect}
            onEnterKeyDown={this.handleSelect}
            onError={onError}
            shouldFetchSuggestions={shouldFetchSuggestions}
            options={this.props.options}
          />
          {this.state.loading && (
            <div>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
            </div>
          )}
          {this.state.geocodeResults && (
            <div className="geocoding-results">{this.state.geocodeResults}</div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBar
