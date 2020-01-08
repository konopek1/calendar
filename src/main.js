import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faLaptopCode, faPenAlt, faPenSquare, faPlusSquare, faTimes,faUserPlus,faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VueFlashMessage from 'vue-flash-message'

Vue.use(VueFlashMessage,{messageOptions:{timeout:1000}});
library.add(faTimes, faPenSquare, faPlusSquare, faPenAlt, faLaptopCode,faUserPlus,faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
