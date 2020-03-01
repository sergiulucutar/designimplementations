export class UI {
  constructor() {
    this.levelEl = document.getElementById('level');
    this.energyEl = document.getElementById('energy');
  }

  setLevel(level) {
    this.levelEl.textContent = level;
  }

  setEvergy(percentage) {
    this.energyEl.textContent = `${Math.floor(percentage)}%`;
  }
}
