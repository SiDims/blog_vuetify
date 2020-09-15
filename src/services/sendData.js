import axios from 'axios'

const api_url = process.env.VUE_APP_API_URL

export default function sendData(dispatch, path, options = {}) {
    return new Promise((resolve, reject) => {
        axios({url: api_url + path, ...options})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                if (error.response.status === 401) dispatch('AUTH_ERROR', 'Session ended')
                if (error.response.data && error.response.data.message) dispatch('SET_ERROR', error.response.data.message)
                reject(error)
            })
    })
}