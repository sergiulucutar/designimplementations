<template>
  <div @mouseenter="mouseEnter" @mousemove="mouseMove" @mouseleave="mouseLeave">
    <Slider v-if="!isLoading" ref="slider" @hoverButtons="hoverButtons"></Slider>
    <transition name="fade">
      <LoadingScreen v-if="isLoading" :show="a_loadingState"></LoadingScreen>
    </transition>
    <CustomCursor ref="customCursor"></CustomCursor>
  </div>
</template>

<script>
import CustomCursor from "./CustomCursor.vue";
import LoadingScreen from "./LoadingScreen.vue";
import Slider from "./Slider.vue";

import store from './store';

export default {
  components: {
    CustomCursor,
    LoadingScreen,
    Slider
  },
  data() {
    return {
      isLoading: true,
      a_loadingState: false
    }
  },
  created() {
    this.loadImages();
  },
  mounted() {
    setTimeout(() => {this.a_loadingState = true}, 1000);
    setTimeout(() => {this.a_loadingState = false}, 2000);
  },
  methods: {
    slide(delta = 1) {
      this.$refs.slider.nextSlide(delta);
      this.$refs.customCursor.click(delta);
    },
    mouseEnter() {
      this.$refs.customCursor.mouseEnter();
    },
    mouseMove(event) {
      this.$refs.customCursor.mouseMove(event);
    },
    mouseLeave() {
      this.$refs.customCursor.mouseLeave();
    },
    hoverButtons(data) {
      this.$refs.customCursor.hover(data);
    },
    loadImages() {
      const imageUrls = [
        'https://images.unsplash.com/photo-1494625927555-6ec4433b1571?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
        'https://images.unsplash.com/photo-1461300617643-0aeca186c805?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1509398270984-356a44f8a4ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        'https://images.unsplash.com/photo-1512627282235-5174e883f9b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1534057308991-b9b3a578f1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1546498159-9a2fac87e770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=610&q=80'
      ];
      const promises = [];

      for(let url of imageUrls) {
        promises.push(new Promise(resolve => {
          const imgObj = new Image();
          imgObj.onload = resolve;
          imgObj.src = url;
          store.addImage(imgObj);
        }));
      }

      Promise.all(promises).then(() => setTimeout(() => this.isLoading = false, 3000));
    }
  }
};
</script>

<style lang="scss">
div {
  position: relative;

  cursor: none;

  .sliderControlsArea {
    position: absolute;
    top: 0;

    width: 20%;
    height: 100%;

    z-index: 1;

    &:nth-child(1) {
      left: 0;
    }

    &:last-child {
      right: 0;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.4s cubic-bezier(0, 0.32, 0.23, 1);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
