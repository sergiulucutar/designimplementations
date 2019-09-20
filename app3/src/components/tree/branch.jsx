export default class Branch {
  constructor(pos, parent, dir) {
    this.pos = pos;
    this.parent = parent;
    this.dir = dir;
    this.isTip = true;

    this.originalDir = [...dir];

    this.attactionsCount = 0;
    this.attactions = [];
    this.hasBeenSplit = false;
    this.dead = false;
  }

  reset() {
    this.dir = [...this.originalDir];
    this.attactions = [];
    this.attactionsCount = 0;
  }
}
