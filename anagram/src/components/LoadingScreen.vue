<template>
  <section>
    <logo :show="show"></logo>
  </section>
</template>
<script>
import Logo from './Logo.vue'
export default {
  props: [
    'show'
  ],
  components: {
    Logo
  },
  watch: {
    show: function(value) {
      this.show = value
    }
  }
}
</script>
<style lang="scss">
section {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: #101010;

  // z-index: 4;
}
</style>