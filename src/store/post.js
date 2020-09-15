import sendData from '../services/sendData'

const state = {
    posts: [],
    totalPages: null,
    currentPage: null,
    post: null
}

const actions = {
    async DELETE({commit, dispatch}, id) {
        try {
            return await sendData(dispatch, '/post/' + id, {method: 'DELETE', headers: {authorization: localStorage.getItem('token')}})
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async NEW_POST({commit, dispatch}, data) {
        try {
            const response = await sendData(dispatch, '/post/create', {
                method: 'POST',
                data: data,
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })

            commit('SET_POSTS', response)
            return response
        } catch (e) {
            throw e
        }
    },

    async POSTS({commit, dispatch}, page, ) {
        try {
            const response = await sendData(dispatch, `/post/posts/all/${page}`)
            commit('SET_POSTS', response.data)
            return response
        } catch (e) {
            throw e
        }
    },

    async POST({commit, dispatch}, id) {
        try {
            const response = await sendData(dispatch, `/post/${id}`)
            commit('SET_POST', response.data)
            return response
        } catch (e) {
            throw e
        }
    },

    async USER_POSTS({commit, dispatch}, page) {
        try {
            const response = await sendData(dispatch, `/post/posts/user/${page}`, {
                headers: {authorization: localStorage.getItem('token')}
            })
            commit('SET_POSTS', response.data)
            return response
        } catch (e) {
            throw e
        }
    },

    async UPDATE({commit, dispatch}, data) {
        try {
            return await sendData(dispatch, '/post/edit', {
                method: 'PUT',
                data: data,
                headers: {authorization: localStorage.getItem('token')}
            })
        } catch (e) {
            throw e
        }
    },

    async COMMENT({commit, dispatch}, data) {
        try {
            const response = await sendData(dispatch, '/post/comment', {
                method: 'POST',
                data: data,
                headers: {authorization: localStorage.getItem('token')}
            })
            commit('SET_COMMENT', response)
            return response
        } catch (e) {
            throw e
        }
    }
}

const mutations = {
    SET_POSTS(state, data) {
        state.posts = data.posts
        state.totalPages = data.totalPages
        state.currentPage = data.currentPage
    },

    SET_POST(state, data) {
        state.post = data
    },

    SET_COMMENT(state, data) {
        state.post.comments.unshift(data.data)
    }
}

const getters = {
    getPosts(state) {
        return {
            posts: state.posts,
            totalPages: state.totalPages
        }
    },

    getPost: state => state.post
}

export default {
    state,
    mutations,
    actions,
    getters
}