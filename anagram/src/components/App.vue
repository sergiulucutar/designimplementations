<template>
  <div @mousemove="mouseMove">
    <Slider></Slider>
    <CustomCursor ref="customCursor"></CustomCursor>
  </div>
</template>

<script>
import CustomCursor from "./CustomCursor.vue";
import Slider from "./Slider.vue";

export default {
  components: {
    CustomCursor,
    Slider
  },
  methods: {
    mouseMove(event) {
      this.$refs.customCursor.mouseMove(event);
    }
  }
};
</script>

<style lang="scss">
div {
  cursor: none;
}
</style>
