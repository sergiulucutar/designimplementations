<template>
  <div @mousemove="mouseMove" @mouseout="mouseOut">
    <div class="anagram_background" :data-sliderIndex="sliderIndex">
      <transition-group class="anagram_background-left" name="slideleft" tag="div">
        <div
          v-show="sliderIndex == 0"
          key="1"
          class="layer"
          :style="{
            transform: 'translate3d(' + this.displacement + '%, 0, 0)',
            backgroundImage: 'url(./images/beer_bg-1.webp)'
          }"
        ></div>
        <div
          v-show="sliderIndex == 1"
          key="2"
          class="layer"
          style="background-image: url('./images/beer_bg-2.webp')"
        ></div>
        <div
          v-show="sliderIndex == 2"
          key="3"
          class="layer"
          style="background-image: url('./images/beer_bg-3.webp')"
        ></div>
      </transition-group>
      <transition-group class="anagram_background-right" name="slideright" tag="div">
        <div
          v-show="sliderIndex == 0"
          key="1"
          class="layer"
          :style="{
            backgroundPosition: this.displacement + '%',
            backgroundImage: 'url(./images/beer_bg-1.webp)'
          }"
        ></div>
        <div
          v-show="sliderIndex == 1"
          key="2"
          class="layer"
          style="background-image: url('./images/beer_bg-2.webp')"
        ></div>
        <div v-show="sliderIndex == 2" key="3" class="layer" style="background-image: url('3')"></div>
      </transition-group>
    </div>
    <main>
      <span class="flavor">we are a beer company</span>
      <header>
        <span>A</span>
        <span>
          NA
          <span
            class="spin"
            :style="{
              transform:
                'rotate(' + (360 / this.sliderCount) * this.sliderIndex + 'deg)'
            }"
          >*</span>
        </span>
        <span>
          GRAM
          <span
            class="spin"
            :style="{
              transform:
                'rotate(' + (360 / this.sliderCount) * this.sliderIndex + 'deg)'
            }"
          >*</span>
        </span>
      </header>
      <button class="menu_button">
        <i class="fas fa-bars"></i>
      </button>
      <transition-group class="slide_image" name="slideleft" tag="div">
        <img
          v-show="sliderIndex == 0"
          key="1"
          class="layer"
          src="./images/beer-1.webp"
          alt="Beer Image"
        />
        <img
          v-show="sliderIndex == 1"
          key="2"
          class="layer"
          src="./images/beer-2.webp"
          alt="Beer Image"
        />
        <img
          v-show="sliderIndex == 2"
          key="3"
          class="layer"
          src="./images/beer-3.webp"
          alt="Beer Image"
        />
      </transition-group>
      <transition-group class="slide_description" name="slideright" tag="div">
        <div v-show="sliderIndex == 0" key="1" class="layer">
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
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displacement: 0,
      sliderIndex: 0,
      sliderCount: 3
    };
  },
  methods: {
    nextSlide() {
      this.sliderIndex = (this.sliderIndex + 1) % this.sliderCount;
    },
    mouseMove(event) {
      this.displacement = -Math.floor(
        Math.abs(event.clientX - window.innerWidth / 2) / 100
      );
    },
    mouseOut(event) {
      this.displacement = 25;
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
    content: "";
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

    backface-visibility: hidden;
    transition: all 2s ease-in-out;

    // opacity: 1;
  }

  &[data-sliderIndex="0"] {
    &:after {
      background-color: #dd6031;
    }
  }

  &[data-sliderIndex="1"] {
    &:after {
      background-color: #246eb9;
    }
  }

  &[data-sliderIndex="2"] {
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

  width: 100%;
  height: 100%;
  padding: 20px;

  button {
    grid-row: 2;
    grid-column: -2;

    background-color: transparent;
    border: none;
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
  &_image {
    grid-row: 2 / -1;
    grid-column: 2;

    position: relative;
    // display: flex;/

    overflow: hidden;

    img {
      height: 100%;
      width: auto;
    }

    .layer {
      position: absolute;
      bottom: 0;
      right: 30px;
    }
  }

  &_description {
    grid-row: 3 / span 2;
    grid-column: 3 / span 2;

    position: relative;

    .layer {
      position: absolute;
      left: 30px;

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
      font-size: 10rem;
    }

    h3 {
      // color: yellow;
      font-family: "Shadows Into Light", cursive;
      font-size: 8rem;

      line-height: 1;

      transform: skewY(-10deg);
    }
  }

  &_button {
    color: white;
    font-size: 5rem;

    justify-self: end;
    align-self: flex-start;

    cursor: pointer;
    outline: none;
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
    transform: translate3d(-40%, 0, 0);
  }
}

.slide_description .layer {
  &.slideright-enter {
    transform: translate3d(-100%, 0, 0);
  }

  &.slideright-leave-to {
    transform: translate3d(40%, 0, 0);
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
