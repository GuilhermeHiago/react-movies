import axios from 'axios'

var api_key = '129f4b088f4bc0060eab14b4f45b9659'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

// baseImgUrl = 'https://image.tmdb.org/t/p/' # /w500 = width 500 # ou /original

export default api;