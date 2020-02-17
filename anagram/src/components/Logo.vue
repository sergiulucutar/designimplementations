<template>
<div class="logo">
    <div class="layer">
    <transition name="slideleft">
      <div v-show="show" class="logo_wrapper">
      <span>A</span>
      <span>NA*</span>
      <span>GRAM*</span>
      </div>
    </transition>
    </div>
    <div class="layer">
      <transition name="slideright">
        <div v-show="show" class="logo_wrapper">
        <span>A</span>
        <span>NA*</span>
        <span>GRAM*</span>
        </div>
      </transition>
    </div>
</div>
</template>
<script>
export default {
  props: [
    'show'
  ],
  watch: {
    show: function(value) {
      this.show = value;
    }
  }
}
</script>
<style lang="scss">
.logo {
  position: relative;

  display: grid;
  grid-template-columns: 1fr 1fr;

  .layer {
  // position: absolute;
  // top: 0;
  // left: 0;
  text-align: center;
  overflow: hidden;

  span {
    display: block;

    color: white;

    font-size: 2rem;
    letter-spacing: 10px;
    text-indent: 10px;
    text-align: center;
  }

  &:first-of-type .logo_wrapper {
    transform: translate3d(50%, 0, 0);
  }

  &:last-of-type .logo_wrapper {
    transform: translate3d(-50%, 0, 0);
  }

  .logo_wrapper {
  
    &.slideright-enter,
    &.slideright-leave-to {
      transform: translate3d(-100%, 0, 0);
    }

    &.slideleft-enter,
    &.slideleft-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    &.slideright-enter-active,
    &.slideright-leave-active,
    &.slideleft-enter-active,
    &.slideleft-leave-active {
      transition: all 1.4s cubic-bezier(0, 0.32, 0.23, 1);
    }
  }
 }
}
</style>