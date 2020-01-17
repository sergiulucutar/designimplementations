import "./reset.scss";
import "./main.scss";

import Vue from 'vue';

import Design1 from './design1/Design1.vue';
import Design2 from './design2/Design2.vue';
import Design3 from './design3/Design3.vue';

var app = new Vue({
  el: '#app',
  data: {
    message: 'MERGE'
  },
  components: {
    Design1,
    Design2,
    Design3
  }
});
