import "./reset.scss";
import "./main.scss";

import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Design1 from './posters/Design1.vue';
import Design2 from './posters/Design2.vue';
import Design3 from './posters/Design3.vue';

// const routes = {
//   '/': Design1,
//   '/poster2': Design2,
//   '/poster3': Design3
// }

const routes = [
  { path: '/', component: Design1 },
  { path: '/poster1', component: Design1 },
  { path: '/poster2', component: Design2 },
  { path: '/poster3', component: Design3 }
];

const router = new VueRouter({ routes });

const app = new Vue({
  router,
  methods: {
    changePoster(delta) {
      const nextSlide = (3 + delta) % 3 + 1;
      console.log(nextSlide);
      this.$router.push({ path: `/poster${nextSlide}` });
    }
  }
}).$mount('#app');

// var app = new Vue({
//   el: '#app',
//   data: {
//     currentRoute: window.location.pathname
//   },
//   methods: {
//     changePoster(delta) {
//       console.log(delta);
//     }
//   },
//   computed: {
//     ViewComponent() {
//       return routes[this.currentRoute];
//     }
//   },
//   render(h) { return h(this.ViewComponent) }
// });
