import * as fb from 'firebase'

class User {
  constructor (id) {
    if (!id) {
      throw new Error('id in User class must be defined')
    }
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      if (!email) {
        throw new Error('loginUser: email must be not empty')
      }

      if (!password) {
        throw new Error('loginUser: password must be not empty')
      }

      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        // const user = await fb.auth().signInWithEmailAndPassword('ddd329@yandex.ru', '123456')
        // console.log(user.user.Qb.uid)
        commit('setUser', new User(user.user.Qb.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
