<template>
  <svg>
    <circle cx="0" cy="0" r="10" fill="white" :style="{transform: 'translate3d(' + this.cursorPosition.x + 'px, ' + this.cursorPosition.y + 'px, 0)'}"/>
    <!-- <circle cx="0" cy="0" r="20" fill="transparent" stroke="white" :style="{transform: 'translate3d(' + this.cursorPosition.x + 'px, ' + this.cursorPosition.y + 'px, 0)'}"/> -->
    <circle cx="0" cy="0" r="10" fill="transparent" stroke="white" :style="{transform: 'translate3d(' + mirrotCursorPositionX + 'px, ' + this.cursorPosition.y + 'px, 0)'}"/>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      cursorPosition: {
        x: 100,
        y: 100
      },
      mirrotCursorPositionX: window.innerWidth
    };
  },
  methods: {
    click(event) {
      console.log(event);
    },
    mouseMove(event) {
      this.cursorPosition.x = event.clientX;
      this.cursorPosition.y = event.clientY;
      this.mirrotCursorPositionX = window.innerWidth - this.cursorPosition.x;
    }
  }
};
</script>

<style lang="scss">
svg {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
  z-index: 1;

  // circle:nth-child(2) {
  //   transition: transform 0.5s linear;
  // }
}
</style>
