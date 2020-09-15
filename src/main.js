import Vue from 'vue'
import Toasted from 'vue-toasted'
import VueUploadComponent from 'vue-upload-component'
import CKEditor from '@ckeditor/ckeditor5-vue'
import Vuelidate from 'vuelidate'

import dateFilter from './filters/date'
import nameFilter from './filters/name'
import formatSize from './filters/formatSize'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import messagePlugin from './plugins/toast.plugin'
import Loader from './components/Loader'

import 'cropperjs/dist/cropper.css'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Toasted)
Vue.use(CKEditor)
Vue.use(Vuelidate)

Vue.filter('date', dateFilter)
Vue.filter('fz', formatSize)
Vue.filter('name', nameFilter)

Vue.component('FileUpload', VueUploadComponent)
Vue.component('Loader', Loader)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
