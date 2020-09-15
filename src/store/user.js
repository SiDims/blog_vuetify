import sendData from "../services/sendData"

const state = {
    user: null
}

const actions = {
    async LOGIN({commit, dispatch}, data) {
        try {
            const response = await sendData(dispatch, '/login', {method: 'POST', data: data})
            commit('setUser', response)
            localStorage.setItem('token', response.token)
            dispatch('SET_TOKEN', response.token)
            return response
        } catch (e) {
            throw e
        }
    },

    async REGISTRATION({commit, dispatch}, data) {
        try {
            const response = await sendData(dispatch, '/registration', {method: 'POST', data: data})
            commit('setUser', response)
            localStorage.setItem('token', response.token)
            dispatch('SET_TOKEN', response.token)
            return response
        } catch (e) {
            throw e
        }
    },

    async LOGOUT({commit, dispatch}) {
        commit('setLogout')
        dispatch('CLEAR_TOKEN')
    },

    async GET_USER({commit, dispatch}) {
        try {
            const response = await sendData(dispatch, '/user/get', {headers: {authorization: localStorage.getItem('token')}})
            commit('setUser', response)
            return response
        } catch (e) {
            throw e
        }
    },

    async USER_UPDATE({commit, dispatch}, data) {
        const response = await sendData(dispatch, '/user/update', {
            method: 'PUT',
            data: data,
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        commit('updateUser', data)
        return response
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user.data
    },

    updateUser(state, user) {
        Object.assign(state.user, user)
    },

    setLogout(state) {
        state.user = null
    }
}

const getters = {
    user: (state) => state.user
}

export default {
    state,
    actions,
    mutations,
    getters
}