import Vue from 'vue'
import Vuex from 'vuex'
import p from 'bz-lib/module'
import toastr from 'toastr'
function initCatGod (state, cat) {
  if (state.cat_gods[cat] === undefined) {
    Vue.set(state.cat_gods, cat, [])
  }
}
// Vue.use(Vuex)

// state
export const state = {
  cats: [], // god 的类别
  apply_dels: [],
  cat_gods: {} // 按 cat 分类的gods
}
// mutations
export const mutations = {
  SET_CAT_GODS (state, {cat, gods}) {
    initCatGod(state, cat)
    state.cat_gods[cat] = gods
  }
}
// actions
export const actions = {
  putGod ({ state, commit, dispatch }, god) {
    return dispatch('put', {url: '/api_god', body: god, loading: true}).then(function (data) {
      toastr.info('成功')
    })
  },
  getGods ({ state, commit, dispatch }, cat) {
    let parm = {
      cat: cat
    }
    return dispatch('get', {url: '/api_gods', body: parm}).then(function (data) {
      commit('SET_CAT_GODS', {cat: cat, gods: data.gods})
      return data
    })
  },
  getCat ({ state, commit, dispatch }) {
    let parm = {
    }
    return dispatch('get', {url: '/api_cat', body: parm}).then(function (data) {
      state.cats = data.cats
      return data
    })
  },
  getPublicGods ({ state, commit, dispatch }, cat) {
    let parm = {
      cat: cat,
      limit: 10
    }
    let gods = state.cat_gods[cat]
    if (gods) {
      parm.before = gods[gods.length - 1].created_date
    }
    return dispatch('get', {url: '/api_public_gods', body: parm}).then(function (data) {
      commit('SET_CAT_GODS', {cat: cat, gods: data.gods})
    })
  },
  getApplyDel ({ state, commit, dispatch }, id) {
    return dispatch('get', '/api_apply_del').then(function (data) {
      state.apply_dels = data.apply_dels
    })
  },
  approveApplyDel ({ state, commit, dispatch }, apply_del) {
    return dispatch('put', {url: '/api_apply_del', body: apply_del, loading: true}).then(function (data) {
      dispatch('getApplyDel')
    })
  },
  rejectApplyDel ({ state, commit, dispatch }, id) {
    return dispatch('delete', '/api_apply_del/' + id).then(function (data) {
      dispatch('getApplyDel')
    })
  }
}
// getters
export const getters = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    p
  }
})
