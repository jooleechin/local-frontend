import axios from 'axios'
let googleBaseURL = `http://localhost:3000/google`
let googleKeyURL = `http://localhost:3000/googleKEYWORD`
let photoBaseURL = `http://localhost:3000/photo`
let placeIdBaseURL = `http://localhost:3000/placeID`

function getPlace(lat, lng, radius, type, maxPrice) {
  return axios.get(`${googleBaseURL}?lat=${lat}&lng=${lng}&radius=${radius}&type=${type}&maxprice=${maxPrice}`)
}

function getPlaceKeyword(lat, lng, radius, type, keyword, maxPrice) {
  return axios.get(`${googleKeyURL}?lat=${lat}&lng=${lng}&radius=${radius}&type=${type}&maxprice=${maxPrice}&keyword=${keyword}`)
}

function getPhoto(photoreference) {
  return axios.get(`${photoBaseURL}?photoreference=${photoreference}`)
}

function getPlaceID(placeID) {
  return axios.get(`${placeIdBaseURL}?placeID=${placeID}`)
}
export default { getPlace, getPlaceKeyword, getPhoto, getPlaceID }
