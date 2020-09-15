const state = {
    isDesktop: true,
    isMobile: false
}

const actions = {
    DESKTOP({commit}) {
        commit('setDesktop')
    },

    MOBILE({commit}) {
        commit('setMobile')
    }
}

const mutations = {
    setDesktop(state) {
        state.isDesktop = true
        state.isMobile = false
    },

    setMobile(state) {
        state.isDesktop = false
        state.isMobile = true
    }
}

const getters = {
    isDesktop(state) {
        return state.isDesktop
    },
    
    isMobile(state) {
        return state.isMobile
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}