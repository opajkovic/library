import axios from 'axios'

export default axios.create({
  baseURL: 'https://tim4.petardev.live/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // just for test >
    'Authorization': 'Bearer 14|QF4D1r0NKIIKqeq7QdOvrjGEARcgABjyA1islr6n'
  }
});
