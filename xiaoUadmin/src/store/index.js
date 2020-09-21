import Vue from "vue"
import Vuex from "vueX"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        user: {}
    },
    mutations: {
        setuser (state, user) {
            state.user = user
            console.log(state.user)
        }
    }
})