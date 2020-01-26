<template>
  <div class="poster_wrapper">
    <section ref="poster" class="poster3">
      <section class="hero">
        <span>ramones</span>
        <span>ramones</span>
        <span>ramones</span>
        <span>ramones</span>
        <span>ramones</span>
        <span>ramones</span>
      </section>
      <header class="show">
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
      </header>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => this.$refs.poster.classList.add("show"), 10);
  }
};
</script>

<style lang="scss">
.poster3 {
  display: grid;
  grid-template-rows: 7fr 2fr;

  width: 67.8vmin;
  height: 95vmin;

  background-color: #dce0d3;

  font-family: "Roboto", sans-serif;

  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);

  overflow: hidden;

  header {
    grid-row: 2;

    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(7, 1fr);
    padding: 24px;
    padding-bottom: 0;
    grid-gap: 10px;

    .info {
      display: flex;
      flex-direction: column;

      grid-row: 2;

      overflow: hidden;
      transform: translate3d(0, 100%, 0);
      transition: all 3s cubic-bezier(0.23, 1, 0.32, 1) 3s;

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
        color: #24217a;
        font-size: 1.4rem;
        font-weight: bold;
        line-height: 1.4;
      }
    }
  }

  .hero {
    grid-row: 1;
    grid-column: 1 / -1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    line-height: 0.7;

    span {
      position: relative;

      color: #24217a;
      // font-family: "Roboto", sans-serif;
      font-size: 16rem;
      font-weight: bold;

      transform: translate3d(100%, 0, 0);
      transition: transform 3s cubic-bezier(0.23, 1, 0.32, 1);
      z-index: 3;

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 0.1s;
          &:before,
          &:after {
            animation-delay: $i * 0.25s + 4s;
          }
        }
      }

      &:before,
      &::after {
        content: "ramones";
        position: absolute;
        top: 0;
        left: 0;

        font-size: 16rem;
        z-index: -1;

        filter: opacity(0.8);
      }

      &:before {
        color: #0099ca;

        animation: move 6s ease-in-out infinite;
      }

      &:after {
        color: #cd0071;

        animation: move-reverse 6s ease-in-out infinite;
      }
    }
  }

  &.show {
    header .info {
      transform: translate3d(0, 0, 0);
    }

    .hero span {
      transform: translate3d(0, 0, 0);
    }
  }
}

// ONE WAY
@keyframes move {
  20% {
    transform: translate3d(0, -10%, 0);
  }

  40% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes move-reverse {
  20% {
    transform: translate3d(0, 10%, 0);
  }

  40% {
    transform: translate3d(0, 0, 0);
  }
}

// UP & DOWN

// @keyframes move {
//   5% {
//     transform: translate3d(0, -10%, 0);
//   }

//   15% {
//     transform: translate3d(0, 10%, 0);
//   }

//   20% {
//     transform: translate3d(0, 0, 0);
//   }
// }

// @keyframes move-reverse {
//   5% {
//     transform: translate3d(0, 10%, 0);
//   }

//   15% {
//     transform: translate3d(0, -10%, 0);
//   }

//   20% {
//     transform: translate3d(0, 0, 0);
//   }
// }

// ROTATION

// @keyframes move {
//   2.8% {
//     transform: translate3d(2%, -4%, 0);
//   }

//   5.6% {
//     transform: translate3d(4%, 0%, 0);
//   }

//   8.4% {
//     transform: translate3d(2%, 4%, 0);
//   }

//   11.2% {
//     transform: translate3d(-2%, 4%, 0);
//   }

//   14% {
//     transform: translate3d(-4%, 0%, 0);
//   }

//   16.8% {
//     transform: translate3d(-2%, -4%, 0);
//   }

//   20% {
//     transform: translate3d(0, 0, 0);
//   }
// }

// @keyframes move-reverse {
//   2.8% {
//     transform: translate3d(-2%, 4%, 0);
//   }

//   5.6% {
//     transform: translate3d(-4%, 0%, 0);
//   }

//   8.4% {
//     transform: translate3d(-2%, -4%, 0);
//   }

//   11.2% {
//     transform: translate3d(2%, -4%, 0);
//   }

//   14% {
//     transform: translate3d(4%, 0%, 0);
//   }

//   16.8% {
//     transform: translate3d(2%, 4%, 0);
//   }

//   20% {
//     transform: translate3d(0, 0, 0);
//   }
// }
</style>

