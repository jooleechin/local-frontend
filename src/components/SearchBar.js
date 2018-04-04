
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
};

const options = {
  types: ['(cities)']
}

const shouldFetchSuggestions = ({ value }) => value.length > 2;

const onError = (status, clearSuggestions) => {
  /* eslint-disable no-console */
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
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
        <strong>
          {lat}, {lng}
        </strong>
      </div>
    );
  }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        console.log('Blur event!'); // eslint-disable-line no-console
      },
      onFocus: () => {
        console.log('Focused!'); // eslint-disable-line no-console
      },
      autoFocus: true,
      placeholder: 'Search Cities...',
      name: 'Demo__input',
      id: 'my-input-id',
    }
    return(
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
            options={options}
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
