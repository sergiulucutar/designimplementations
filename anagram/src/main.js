import './main.scss';

import Vue from 'vue';
import Slider from './Slider.vue';

var app = new Vue({
  data: {
    sliderIndex: 0
  },
  components: {
    Slider
  }
}).$mount("#app");