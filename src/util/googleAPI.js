import axios from 'axios'
let googleBaseURL = `http://localhost:3000/google`
let photoBaseURL = `http://localhost:3000/photo`

function getRestaurant(lat, lng, radius, type, keyword) {
  return axios.get(`${googleBaseURL}?lat=${lat}&lng=${lng}&radius=${radius}&type=${type}&keyword=${keyword}`)
}

function getPhoto(photoreference) {
  return axios.get(`${photoBaseURL}?photoreference=${photoreference}`)
}
export default { getRestaurant, getPhoto }
