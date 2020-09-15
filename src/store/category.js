import sendData from "../services/sendData";

const state = {
    category: []
}

const actions = {
    async GET_CATEGORY({commit, dispatch}) {
        try {
            const category = await sendData(dispatch, '/category/get')
            commit('SET_CATEGORY', category)
            return category
        } catch (e) {
            throw e
        }
    },
    async ADD_CATEGORY({commit, dispatch}, data) {
        try {
            const category = await sendData(dispatch, '/category/create', {
                method: 'POST',
                data: data,
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            commit('ADD_CATEGORY', category.data)
            return category
        } catch (e) {
            throw e
        }
    }
}

const mutations = {
    SET_CATEGORY(state, data) {
        state.category = data.data
    },

    ADD_CATEGORY(state, data) {
        state.category.push(data)
    }
}

const getters = {
    getCategory(state) {
        return state.category
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
