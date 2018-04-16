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
    return res.data
  })
  .catch((err) => {
    console.log(err)
  })
}

function addToItinPlaceJoin(itinPlace) {
  return axios.post(`${baseURL}/itinplaces`, itinPlace)
  .then ((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
}

function getCurrentItin(itin_id, user_id) {
  return axios.get(`${baseURL}/itins/${itin_id}/user/${user_id}`)
    .then ((res) => {
      return res.data.allPlaces
    })
    .catch((err) => {
      console.log(err)
    })
}

function createItin(newItin) {
  return axios.post(`${baseURL}/itins`, newItin)
  .then((res) => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.log(err)
  })
}

function getAllItinByUser(user_id) {
  return axios.get(`${baseURL}/itins/user/${user_id}`)
  .then((res) => {
    console.log(res)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

function getActivity(itin_id) {
  return axios.get(`${baseURL}/questions/itin/${itin_id}`)
  .then((res) => {
    return res.data.one
  })
  .catch(err => {
    console.log(err)
  })
}

function getQuestions(user_id) {
  return axios.get(`${baseURL}/questions/users/${user_id}`)
  .then((res) => {
    console.log(res.data.one)
    return res.data.one
  })
  .catch(err => {
    console.log(err)
  })
}

function deleteItin(itin_id) {
  return axios.delete(`${baseURL}/itins/${itin_id}`)
  .then ((res) => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.log(err)
  })
}

function deletePlace(place_ID) {
  return axios.delete(`${baseURL}/places/${place_ID}`)
  .then ((res) => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.log(err)
  })
}


export default {
  createAnswer,
  addToItin,
  addToItinPlaceJoin,
  getCurrentItin,
  createItin,
  getAllItinByUser,
  getActivity,
  getQuestions,
  deleteItin,
  deletePlace
}
