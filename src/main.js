import Vue from 'vue'
import App from './App.vue'
import VueSession from 'vue-session';
import VueRouter from 'vue-router';
import VModal from 'vue-js-modal'
import Login from './components/Login';
import EmailDashboard from './components/EmailDashboard';
import './../node_modules/bulma/css/bulma.css';
Vue.use(VueSession);
Vue.use(VueRouter);
Vue.use(VModal)
const session = Vue.prototype.$session;

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    beforeEnter: function (to, before, next) {
      if (!session.exists()) {
        next({
          path: '/login'
        })
      } else {
        next({
          path: '/dashboard'
        });
      }
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/dashboard',
    component: EmailDashboard
  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
