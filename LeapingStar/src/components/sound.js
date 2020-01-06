// Load sounds
const s_pop = require("../assets/sound/pop.wav");
const s_magic = require("../assets/sound/magic.wav");

// background
const s_celestial = require("../assets/sound/celestial.wav");
const s_wind = require("../assets/sound/wind.mp3");

export default class Sound {
  constructor() {
    this.sounds = {
      pop: new Audio(s_pop),
      magic: new Audio(s_magic),
      celestial: new Audio(s_celestial),
      wind: new Audio(s_wind)
    };
  }

  init() {
    // this.sounds.wind.muted = false;
    // this.sounds.wind.loop = true;
    // this.sounds.wind.volume = 0.5;
    // this.sounds.wind.play();
  }

  play(key) {
    this.sounds[key].currentTime = 0;
    this.sounds[key].play();
  }
}
