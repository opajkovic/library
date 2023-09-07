import axios from 'axios'

export default axios.create({
  baseURL: 'https://tim4.petardev.live/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // just for test >
    'Authorization': 'Bearer 18|m6tz6lkk4ppTRAtQeiY8Vg6KQXmKXG2MAQQPZno9'
  }
});
