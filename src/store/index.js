import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from "../apis/users"

Vue.use(Vuex)

export default new Vuex.Store({
  //類似data
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  //管理/應用state的method
  mutations: {
    setCurrentUser(state, currentUser) { //state: vuex內的資料, currentUser:API取得的資料
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        if (data.status === 'error') return new Error(data.message)
        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', { id, name, email, image, isAdmin })
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
