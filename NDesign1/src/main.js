import Vue from "vue";

import "./components/landing.js";
import VueRouter from "vue-router";

const Home = Vue.component("home", { template: "<div>home</div>" });
const Stories = Vue.component("stories", { template: "<div>Stories</div>" });

const routes = {
  "/": Home,
  "/stories": Stories
};

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: Home },
    { path: "/stories", component: Stories }
  ]
});

new Vue({
  el: "#root",
  render(h) {
    return h(Home);
  }
});
