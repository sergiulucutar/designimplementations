import "./reset.scss";
import "./main.scss";

import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Design1 from './posters/Design1.vue';
import Design2 from './posters/Design2.vue';
import Design3 from './posters/Design3.vue';

const routes = [
  { path: '/', component: Design1 },
  { path: '/poster/1', component: Design1 },
  { path: '/poster/2', component: Design2 },
  { path: '/poster/3', component: Design3 }
];

const router = new VueRouter({ mode: 'history', routes });

const app = new Vue({
  router,
  data() {
    return {
      sliderIndex: 0
    }
  },
  created() {
    // Update the slider index if the app has been accessed by directly going to a certain poster
    const index = parseInt(this.$router.currentRoute.path.split('/').pop()) - 1;
    this.sliderIndex = index || this.sliderIndex;
  },
  methods: {
    changePoster(delta) {
      this.sliderIndex = (this.sliderIndex + 3 + delta) % 3;
      this.$router.push({ path: `/poster/${this.sliderIndex + 1}` });
    }
  }
}).$mount('#app');
