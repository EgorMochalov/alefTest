import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        data: { name: '', age: null,child:[] }
    },
    mutations: {
        edit(state, newData) {
            state.data = newData
        }
    },
    actions: {
        editData({ commit }, data) {
            commit("edit", data)
        }
    }
});

createApp(App).use(router).use(store).mount('#app')
