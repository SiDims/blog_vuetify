import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import post from './post'
import resize from "./resize"
import user from './user'
import images from './images'
import category from './category'

Vue.use(Vuex)

const state = {
    error: null,
    token: localStorage.getItem('token') || null
}

const actions = {
    AUTH_ERROR({commit}, err) {
        localStorage.removeItem('token')
        commit('cleatToken')
        commit('setError', err)
        router.push('/login')
    },
    SET_ERROR({commit}, err) {
        commit('setError', err)
    },
    CLEAR_ERROR({commit}) {
        commit('clearError')
    },
    SET_TOKEN({commit}, token) {
        commit('setToken', token)
    },
    CLEAR_TOKEN({commit}) {
        localStorage.removeItem('token')
        commit('cleatToken')
    },
}

const mutations = {
    setError(state, err) {
        state.error = err
    },
    clearError(state) {
        state.error = null
    },
    setToken(state, token) {
        state.token = token
    },
    cleatToken(state) {
        state.token = null
    }
}

const getters = {
    error: state => state.error,
    isAuth: state => !!state.token
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: {
        post,
        resize,
        user,
        images,
        category
    }
})
