import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = { template: "<p>Home</p>" };
const Stories = { template: "<p>Stories</p>" };

const routes = [
  { path: "/", component: App },
  { path: "/stories", component: Stories }
];

const router = new VueRouter({ base: window.location.href, routes });

const app = new Vue({
  router
}).$mount("#app");
