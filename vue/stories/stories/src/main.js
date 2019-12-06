import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import Home from "./routes/Home.vue";
import Stories from "./routes/Stories.vue";

// import video from "./assets/video.mp4";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/stories", component: Stories }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

// const router = new VueRouter({ base: window.location.href, routes });

const app = new Vue({
  router,
  render: h => h(App)
}).$mount("#root");
