import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyBD4awijy5cHrWfd9Nh8VRNSzhQ1ve_TmU',
      authDomain: 'itc-ads-ddd329.firebaseapp.com',
      databaseURL: 'https://itc-ads-ddd329.firebaseio.com',
      projectId: 'itc-ads-ddd329',
      storageBucket: 'itc-ads-ddd329.appspot.com',
      messagingSenderId: '511455135363'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
