import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import Stories from "./routes/Stories.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: App },
  { path: "/stories", component: Stories }
];

const router = new VueRouter({ base: window.location.href, routes });

const app = new Vue({
  router
}).$mount("#app");
