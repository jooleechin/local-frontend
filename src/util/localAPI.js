import axios from 'axios'
let baseURL = `http://localhost:3000`

function createAnswer(newAnswer) {
  return axios.post(`${baseURL}/questions`, newAnswer)
  .then ((res) => {
    console.log(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
}

function addToItin(place) {
  return axios.post(`${baseURL}/places`, place)
  .then ((res) => {
    console.log(res)
    return res.data.place
  })
  .catch((err) => {
    console.log(err)
  })
}

function addToItinPlaceJoin(itinPlace) {
  return axios.post(`${baseURL}/itinplaces`, itinPlace)
  .then ((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
  })
}

function getCurrentItin(user_id, itin_id) {
  return axios.get(`${baseURL}/itins/${itin_id}/user/${user_id}`)
    .then ((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}


export default { createAnswer, addToItin, addToItinPlaceJoin, getCurrentItin }
