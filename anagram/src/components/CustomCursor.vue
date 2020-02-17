<template>
  <svg>
    <circle
      cx="0"
      cy="0"
      :r="this.r"
      fill="white"
      :style="{transform: 'translate3d(' + this.cursorPosition.x + 'px, ' + this.cursorPosition.y + 'px, 0)'}"
    />
    <circle
      cx="0"
      cy="0"
      :r="this.r"
      fill="transparent"
      stroke="white"
      :style="{transform: 'translate3d(' + mirrotCursorPositionX + 'px, ' + this.cursorPosition.y + 'px, 0)'}"
    />
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
      r: 10,
      hovered: false,
      mirrotCursorPositionX: window.innerWidth
    };
  },
  methods: {
    hover(data) {
      this.r = data ? 50 : 10;
    },
    mouseEnter() {
      this.r = 10;
    },
    mouseMove(event) {
      this.cursorPosition.x = event.clientX;
      this.cursorPosition.y = event.clientY;
      this.mirrotCursorPositionX = window.innerWidth - this.cursorPosition.x;
    },
    mouseLeave() {
      this.r = 0;
    }
  }
};
</script>

<style lang="scss">
svg {
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  pointer-events: none;
  z-index: 10;
  mix-blend-mode: difference;

  circle {
    transition: r 0.2s cubic-bezier(0, 0.32, 0.23, 1);
  }
}
</style>
