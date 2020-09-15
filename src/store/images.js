import sendData from "../services/sendData";

const state = {
    images: []
}

const actions = {
    async GET_IMAGES({commit, dispatch}) {
        try {
            const response = await sendData(dispatch, '/image/getAll', {headers: {authorization: localStorage.getItem('token')}})
            commit('SET_IMAGES', response)
            return response
        } catch (e) {
            throw e
        }
    },

    async UPLOAD_FILE({commit, dispatch}, image) {
        try {
            const response = await sendData(dispatch, '/image/upload', {
                method: 'POST',
                data: image,
                headers: {authorization: localStorage.getItem('token')}
            })
            commit('SET_IMAGE', response)
            return response
        } catch (e) {
            throw e
        }
    },

    async REMOVE_FILE({commit, dispatch}, id) {
        try {
            const response = await sendData(dispatch, '/image/upload', {
                method: 'DELETE',
                data: {id},
                headers: {authorization: localStorage.getItem('token')}
            })

            commit('REMOVE_IMAGE', id)
            return response
        } catch (e) {
            throw e
        }
    }
}

const mutations = {
    SET_IMAGES(state, data) {
        state.images = data.data
    },
    SET_IMAGE(state, data) {
        state.images.unshift(data.data)
    },
    REMOVE_IMAGE(state, id) {
        state.images = state.images.filter(item => item._id !== id)
    }
}

const getters = {
    getImages(state) {
        return state.images
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}