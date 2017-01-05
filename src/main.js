import Vue from 'vue'
// import VueRouter from 'vue-router'
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// set lang
// var lang = window.localStorage.getItem('lang') || 'th'
// Vue.config.lang = lang
// // set locales
// import locales from './locales'
// Object.keys(locales).forEach(function (lang) {
//   Vue.locale(lang, locales[lang])
// })
import router from './router'

import fastclick from 'fastclick'
import App from './App.vue'
import store from './store'
store.commit('CHECK_LOGIN')

router.beforeEach((to, from, next) => {
  // check is login?
  if (!store.state.p.is_login && (to.name === 'MyGods' || to.name === 'Collect')) {
    window.location.href = '/login.html'
    // next('/Login')
    return
  }
  next()
})

App.router = router
let instance = new Vue(App).$mount('#app')

fastclick.attach(document.body)

import initErrorHandle from 'bz-lib/functions/initErrorHandle'
initErrorHandle()
export default {
  instance
}
