import axios from 'axios'

export default axios.create({
    baseURL: 'https://petardev.live/',
    headers: { "Content-Type": "application/json"  },
})