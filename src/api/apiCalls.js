import axios from 'axios'

export default axios.create({
  baseURL: 'https://tim4.petardev.live/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // just for test >
    // 'Authorization': 'Bearer 13|8LTCD0QxJho9jsKoZcfKEdHZuuSwDJdQxR7RIFYm'
  }
});
