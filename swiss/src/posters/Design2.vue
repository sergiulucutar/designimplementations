<template>
  <section class="poster2">
    <header ref="header">
      <div class="info">
        <span>straight music presents</span>
        <span>the undertones</span>
      </div>
      <div class="info">
        <span>victoria hall hanley</span>
        <span>stroke-on-trent, england</span>
      </div>
      <div class="info">
        <span>advance tickets: $3.00</span>
        <span>at door: $4.50</span>
      </div>
      <div class="info">
        <span>with special guests</span>
        <span>the chords</span>
      </div>
      <div class="info">
        <span>tuesday</span>
        <span>june 5 1979 / 7:30 pm</span>
      </div>
    </header>
    <canvas ref="canvas"></canvas>
  </section>
</template>

<script>
import { TweenLite, Power4, Circ, Linear } from "gsap";

export default {
  data() {
    return {
      ctx: null,
      requestAnimationFrameId: null,
      animation: {
        intro: {
          angle: -Math.PI,
          intensity: 0,
          isFinished: false
        },
        angle: Math.PI / 2 / 20,
        rotatetionAngle: 0,
        shadows: {
          current: 1,
          max: 30
        }
      }
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.$refs.canvas.width = this.$refs.canvas.offsetWidth;
    this.$refs.canvas.height = this.$refs.canvas.offsetHeight;
    this.ctx.font = "bold 110px Arial";

    this.$refs.header.classList.add("show");

    TweenLite.to(this.animation.intro, 1, {
      angle: 0,
      intensity: 1,
      ease: Linear.easeIn,
      onComplete: () => {
        this.animation.intro.isFinished = true;
      }
    });
    this.loop();
  },
  methods: {
    draw() {
      this.ctx.clearRect(
        0,
        0,
        this.$refs.canvas.offsetWidth,
        this.$refs.canvas.offsetHeight
      );

      if (this.animation.intro.isFinished) {
        this.drawTail();
        this.ctx.fillStyle = `hsla(0, 0%, 0%, 1)`;
        this.ctx.fillText("undertones", 0, 100);
      } else {
        this.ctx.save();
        this.ctx.translate(0, 100);
        this.ctx.rotate(this.animation.intro.angle);
        this.ctx.fillStyle = `hsla(0, 0%, ${100 -
          this.animation.intro.intensity * 100}%, ${
          this.animation.intro.intensity
        })`;
        this.ctx.fillText("undertones", 0, 0);
        this.ctx.restore();
      }
    },
    drawTail() {
      this.ctx.save();
      this.ctx.translate(0, 100);
      this.ctx.rotate(this.animation.rotatetionAngle);

      this.ctx.fillStyle = `hsla(0, 0%, 0%, 0.9)`;
      this.ctx.fillText("undertones", 0, 0);

      for (let i = 0; i < this.animation.shadows.current; i++) {
        this.ctx.rotate(this.animation.angle);
        this.ctx.fillStyle = `hsla(0, 0%, 0%, ${0.9 -
          i / this.animation.shadows.max})`;
        this.ctx.fillText("undertones", 0, 0);
      }
      this.ctx.restore();
    },
    update() {
      this.animation.rotatetionAngle += this.animation.angle / 10;
      if (this.animation.rotatetionAngle > this.animation.angle) {
        this.animation.rotatetionAngle = 0;
      }
      if (
        this.animation.intro.isFinished &&
        this.animation.shadows.current < this.animation.shadows.max
      ) {
        this.animation.shadows.current += 1;
      }
    },
    loop() {
      this.requestAnimationFrameId = requestAnimationFrame(
        this.loop.bind(this)
      );

      this.update();
      this.draw();
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.requestAnimationFrameId);
  }
};
</script>

<style lang="scss">
.poster2 {
  display: grid;
  grid-template-rows: 2fr 7fr;

  width: 67.8vmin;
  height: 95vmin;

  background-color: #d9e0d2;

  font-family: "Roboto", sans-serif;

  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);

  header {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(7, 1fr);
    padding: 24px;
    padding-bottom: 0;
    grid-gap: 10px;

    .info {
      display: flex;
      flex-direction: column;

      overflow: hidden;

      &:nth-of-type(1) {
        grid-column: 1 / span 2;
      }

      &:nth-of-type(2) {
        grid-column: 3 / span 2;
      }

      &:nth-of-type(3) {
        grid-column: 6 / span 2;
      }

      &:nth-of-type(4) {
        grid-column: 1 / span 2;
      }

      &:nth-of-type(5) {
        grid-column: 3 / span 2;
      }

      span {
        color: white;
        font-size: 1.4rem;
        font-weight: bold;
        line-height: 1.4;

        opacity: 0;
        transform: rotate(-90deg);
        transform-origin: left;

        transition: all 1s linear;
      }
    }

    &.show {
      span {
        color: #b91a19;
        opacity: 1;
        transform: rotate(0);
      }
    }
  }

  canvas {
    grid-row: 2;
    grid-column: 1 / -1;

    width: 100%;
    height: 100%;
  }
}
</style>
