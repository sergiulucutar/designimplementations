<template>
  <section class="poster1">
      <header ref="header">
        <div class="info">
          <span>monday</span>
          <span>april 29 1985</span>
          <span>all ages</span>
        </div>
        <div class="info">
          <span>with</span>
          <span>butthole surfers</span>
          <span>rites of sprint</span>
        </div>
        <div class="info">
          <span>wust radio hall</span>
          <span>815 v street nw at 8th st.</span>
          <span>washington, dc</span>
        </div>
        <h1><span>dead kennedys</span></h1>
      </header>
      <canvas ref="canvas"></canvas>
    </section>
</template>

<script>
import { TweenLite, Power4 } from "gsap";

export default {
  data() {
    return {
      requestAnimationFrameId: null,
      ctx: null,
      position: [0, 0],
      r: 0,
      rHeight: 45,
      angle: 2 * Math.PI / 18,
      color: ["#CF246C", "#DBB215", "#00A8A8"],
      rotatetionAngle: 0
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.position = [
      this.$refs.canvas.offsetWidth * 0.6,
      this.$refs.canvas.offsetHeight * 0.5
    ];

    this.$refs.canvas.width = this.$refs.canvas.offsetWidth;
    this.$refs.canvas.height = this.$refs.canvas.offsetHeight;
    this.ctx.globalCompositeOperation = "darken";

    TweenLite.to(this, 5, {
      r: this.$refs.canvas.offsetHeight * 0.5,
      ease: Power4.easeOut
    });

    setTimeout(() => {
      this.$refs.header.classList.add("show");
    }, 2000);
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

      this.ctx.save();
      this.ctx.translate(this.position[0], this.position[1]);

      for (let i = 0; i < 9; i++) {
        this.ctx.rotate(this.angle + this.rotatetionAngle);
        this.ctx.beginPath();
        this.ctx.rect(-this.r, -this.rHeight / 2, this.r * 2, this.rHeight);
        this.ctx.fillStyle = this.color[i % 3];
        this.ctx.fill();
      }
      this.ctx.restore();
    },
    update() {
      this.rotatetionAngle += 0.001;
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
.poster1 {
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
    grid-template-columns: repeat(4, 1fr);
    padding: 24px;
    padding-bottom: 0;
    grid-gap: 10px;

    .info {
      display: flex;
      flex-direction: column;

      &:last-of-type {
        grid-column: -2;
      }

      span {
        color: black;
        line-height: 1.4;
        font-size: 1.2rem;

        font-weight: bold;
      }
    }

    h1 {
      display: flex;
      align-items: flex-end;

      grid-row: 2;
      grid-column: 1 / -1;

      span {
        font-size: 6rem;
        font-weight: bold;
      }

      align-self: flex-start;
    }

    span {
      opacity: 0;
      transform: skewY(-10deg) translate3d(0, -100%, 0);

      transition: all 1s cubic-bezier(0.5, 0, 0.1, 1);
    }

    &.show {
      span {
        opacity: 1;
        transform: skewY(0) translate3d(0, 0, 0);
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
