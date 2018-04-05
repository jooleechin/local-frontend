import axios from 'axios'
let KEY = 'AIzaSyAAi2CjqjWvG6U7Y19t9W6BfYMDnHDuiLA'
let baseURL = `http://localhost:3000`

function createAnswer(newAnswer) {
  return axios.get(`${baseURL}/questions`)
  .then ((res) => {
    console.log(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
}

export default { createAnswer }
