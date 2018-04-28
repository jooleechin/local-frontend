import axios from 'axios'
// let googleBaseURL = `https://localhost:3000/google`
// let googleKeyURL = `https://localhost:3000/googleKEYWORD`
// let photoBaseURL = `https://localhost:3000/photo`
// let placeIdBaseURL = `https://localhost:3000/placeID`

let googleBaseURL = `https://local-app.herokuapp.com/google`
let googleKeyURL = `https://local-app.herokuapp.com/googleKEYWORD`
let photoBaseURL = `https://local-app.herokuapp.com/photo`
let placeIdBaseURL = `https://local-app.herokuapp.com/placeID`

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
