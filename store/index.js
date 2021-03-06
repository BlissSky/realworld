const cookieparser = process.server ? require('cookieparser') : undefined

const Cookie = process.client ? require("js-cookie") : undefined;


export const state = () => {
    user:null
}

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    clearUser(state){
        state.user = null
        Cookie.set("user", null)
    }
}

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
}