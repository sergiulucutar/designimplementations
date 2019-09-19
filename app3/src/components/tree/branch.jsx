export default class Branch {
  constructor(pos, parent, dir) {
    this.pos = pos;
    this.parent = parent;
    this.dir = dir;
    this.isTip = true;

    this.originalDir = [...dir];

    this.attactionsCount = 0;
    this.hasBeenSplit = false;
    this.dead = false;
  }

  reset() {
    this.dir = [...this.originalDir];
    this.attactionsCount = 0;
  }
}
