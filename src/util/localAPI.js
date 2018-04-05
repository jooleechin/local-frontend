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

export default { createAnswer }
