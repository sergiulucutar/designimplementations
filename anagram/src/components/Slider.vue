<template>
  <div>
    <div class="anagram_background" :data-sliderIndex="sliderIndex">
      <transition-group
        class="anagram_background-left"
        name="slideleft"
        tag="div"
      >
        <div
          v-show="sliderIndex == 0 && show"
          key="1"
          class="layer"
          :style="{ backgroundImage: 'url(' + state.images[0].src + ')' }"
        ></div>
        <div
          v-show="sliderIndex == 1"
          key="2"
          class="layer"
          :style="{ backgroundImage: 'url(' + state.images[1].src + ')' }"
        ></div>
        <div
          v-show="sliderIndex == 2"
          key="3"
          class="layer"
          :style="{ backgroundImage: 'url(' + state.images[2].src + ')' }"
        ></div>
      </transition-group>
      <transition-group
        class="anagram_background-right"
        name="slideright"
        tag="div"
      >
        <div
          v-show="sliderIndex == 0 && show"
          key="1"
          class="layer"
          :style="{ backgroundImage: 'url(' + state.images[0].src + ')' }"
        ></div>
        <div
          v-show="sliderIndex == 1"
          key="2"
          class="layer"
          :style="{ backgroundImage: 'url(' + state.images[1].src + ')' }"
        ></div>
        <div
          v-show="sliderIndex == 2"
          key="3"
          class="layer"
          :style="{ backgroundImage: 'url(' + state.images[2].src + ')' }"
        ></div>
      </transition-group>
    </div>
    <main>
      <span class="flavor">we are a beer company</span>
      <header>
        <Logo :show="show"></Logo>
        <!-- <span>A</span>
        <span>NA*</span>
        <span>GRAM*</span>-->
        <span class="slide_counter">{{ sliderIndex + 1 }} | 3</span>
      </header>
      <button class="menu_button">
        <i class="fas fa-bars"></i>
      </button>
      <button
        @click="nextSlide($event, -1)"
        @mouseenter="hoverButtons(true)"
        @mouseleave="hoverButtons(false)"
        class="slide_button slide_button-prev"
      >
        <span class="icon_wrapper">
          <i class="fas fa-arrow-left"></i>
          <i class="fas fa-arrow-left"></i>
        </span>
      </button>
      <transition-group class="slide_image" name="slideleft" tag="div">
        <img
          v-show="sliderIndex == 0 && show"
          key="1"
          class="layer"
          :src="state.images[3].src"
        />
        <img
          v-show="sliderIndex == 1"
          key="2"
          class="layer"
          :src="state.images[4].src"
        />
        <img
          v-show="sliderIndex == 2"
          key="3"
          class="layer"
          :src="state.images[5].src"
        />
      </transition-group>
      <transition-group class="slide_description" name="slideright" tag="div">
        <div v-show="sliderIndex == 0 && show" key="1" class="layer">
          <h3>Custom</h3>
          <h2>IPA</h2>
        </div>
        <div v-show="sliderIndex == 1" key="2" class="layer">
          <h3>Blue</h3>
          <h2>Stout</h2>
        </div>
        <div v-show="sliderIndex == 2" key="3" class="layer">
          <h3>That</h3>
          <h2>Pilsner</h2>
        </div>
      </transition-group>
      <button
        @click="nextSlide($event)"
        @mouseenter="hoverButtons(true)"
        @mouseleave="hoverButtons(false)"
        class="slide_button slide_button-next"
      >
        <span class="icon_wrapper">
          <i class="fas fa-arrow-right"></i>
          <i class="fas fa-arrow-right"></i>
        </span>
      </button>
    </main>
  </div>
</template>

<script>
import { Circ, TweenMax } from 'gsap';

import store from './store';
import Logo from './Logo';

export default {
  components: {
    Logo
  },
  data() {
    return {
      sliderIndex: 0,
      sliderCount: 3,
      show: false,
      state: store.state
    };
  },
  mounted() {
    setTimeout(() => (this.show = true), 10);
  },
  methods: {
    hoverButtons(data) {
      this.$emit('hoverButtons', data);
    },
    nextSlide(event, data = 1) {
      const wrapperEl = event.target.children[0];

      this.sliderIndex =
        (this.sliderIndex + data + this.sliderCount) % this.sliderCount;

      TweenMax.set(wrapperEl.children[0], { opacity: 1 });
      TweenMax.to(wrapperEl.children[0], 0.4, {
        opacity: 0,
        ease: Circ.easeInOut
      });

      if (data === 1) {
        TweenMax.set(wrapperEl.children[1], { xPercent: 0 });
        TweenMax.to(wrapperEl.children[1], 0.6, {
          xPercent: 110,
          ease: Circ.easeInOut
        });
      }

      if (data === -1) {
        TweenMax.set(wrapperEl.children[1], { xPercent: 110 });
        TweenMax.to(wrapperEl.children[1], 0.6, {
          xPercent: 0,
          ease: Circ.easeInOut
        });
      }
    }
  }
};
</script>

<style lang="scss">
.flavor {
  font-size: 1.2rem;
}

.anagram_background {
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  width: 100vw;
  height: 100vh;

  &-left,
  &-right {
    position: relative;
  }

  &-left {
    grid-column: 1;

    div.layer {
      transform: scaleX(-1);
    }
  }

  &-right {
    grid-column: 2;
  }

  &::after {
    content: '';
    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: multiply;

    transition: background-color 1.4s cubic-bezier(0, 0.32, 0.23, 1);
  }

  div.layer {
    position: absolute;
    width: 100%;
    height: 100%;

    background-size: cover;
    background-position: 25% 10%;

    // opacity: 1;
  }

  &[data-sliderIndex='0'] {
    &:after {
      background-color: #dd6031;
    }
  }

  &[data-sliderIndex='1'] {
    &:after {
      background-color: #246eb9;
    }
  }

  &[data-sliderIndex='2'] {
    &:after {
      background-color: #4cb944;
    }
  }
}

main {
  position: absolute;
  top: 0;
  left: 0;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);

  @media screen and (min-width: 800px) {
    grid-gap: 50px;
  }

  width: 100%;
  height: 100%;
  padding: 20px;

  button {
    grid-row: 2;
    grid-column: -2;

    background-color: transparent;
    border: none;

    // cursor: none;
  }
}

.menu_button {
  grid-row: 1;
  grid-column: -2;

  justify-self: end;
  align-self: flex-start;

  color: white;
  font-size: 3rem;
}

.slide {
  &_counter {
    margin-top: 20px;

    font-size: 1.2rem;
    // letter-spacing: 0;
  }

  &_image {
    grid-row: 2 / -1;
    grid-column: 1 / -1;

    @media screen and (min-width: 800px) {
      grid-column: 1 / span 2;
    }

    position: relative;

    overflow: hidden;

    img {
      height: 100%;
      width: auto;
    }

    .layer {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  &_description {
    grid-row: 3 / span 2;
    grid-column: 1 / -1;

    @media screen and (min-width: 800px) {
      grid-column: 3 / span 2;
      font-size: 1vmax;
    }

    font-size: 2vw;
    position: relative;

    .layer {
      position: absolute;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      height: 100%;

      color: white;
    }

    overflow: hidden;

    h2,
    h3 {
      margin: 0;
      line-height: 0.9;
    }

    h2 {
      font-size: 10em;
    }

    h3 {
      // color: yellow;
      font-family: 'Shadows Into Light', cursive;
      font-size: 8em;

      line-height: 1;

      transform: skewY(-10deg);
    }
  }

  &_button {
    align-self: flex-start;
    justify-self: end;

    // width: 6rem;

    color: white;
    font-size: 5rem;

    overflow: hidden;
    z-index: 2;

    .icon_wrapper {
      position: relative;

      display: flex;
      pointer-events: none;

      i {
        display: inline-block;
      }
    }

    &-prev {
      grid-column: 1;
      grid-row: 2 / span 2;
      align-self: center;
      justify-self: flex-start;

      i:last-child {
        position: absolute;
        top: 0;
        left: 0;

        // transform: translate(110%, 0);
      }
    }

    &-next {
      grid-column: 4;
      grid-row: 2 / span 2;
      align-self: center;

      i:last-child {
        position: absolute;
        top: 0;
        left: 0;

        transform: translate(-110%, 0);
      }
    }
  }
}

header {
  grid-row: 1;
  grid-column: 2 / span 2;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 2rem;

  span:not(.spin) {
    display: block;

    color: white;

    letter-spacing: 10px;
    text-indent: 10px;
    text-align: center;
  }

  .spin {
    display: inline-block;

    text-align: center;

    transition: transform 1.4s cubic-bezier(0, 0.32, 0.23, 1);
    transform-origin: 50% 50%;
  }
}

// Background Slide transition
.anagram_background div.layer {
  &.slideright-enter {
    background-position: 100% 10%;
  }

  &.slideright-leave-to {
    background-position: 0% 10%;
  }

  &.slideleft-enter {
    background-position: 100% 10%;
  }

  &.slideleft-leave-to {
    background-position: 0% 10%;
  }
}

.slide_image .layer {
  &.slideleft-enter {
    transform: translate3d(100%, 0, 0);
  }

  &.slideleft-leave-to {
    // transform: translate3d(-100%, 0, 0);
  }
}

.slide_description .layer {
  &.slideright-enter {
    transform: translate3d(-100%, 0, 0);
  }

  &.slideright-leave-to {
    // transform: translate3d(100%, 0, 0);
  }
}

.layer {
  &.slideright-enter,
  &.slideright-leave-to,
  &.slideleft-enter,
  &.slideleft-leave-to {
    opacity: 0;
  }

  &.slideright-enter-active,
  &.slideright-leave-active,
  &.slideleft-enter-active,
  &.slideleft-leave-active {
    transition: all 1.4s cubic-bezier(0, 0.32, 0.23, 1);
  }
}
</style>
