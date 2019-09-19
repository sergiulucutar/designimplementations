import Leaf from "./leaf";
import Branch from "./branch";

import { add, dist, div, mult, normalize, sub } from "vectors";

const addVect = add(2);
const distVect = dist(2);
const divVect = div(2);
const normalizeVect = normalize(2);
const multVect = mult(2);
const subVect = sub(2);

export default class Tree {

  static get MIN_DIST() {
    return 10;
  };
  static get MAX_DIST() {
    return 100;
  };

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');

    this.leaves = [];
    this.branches = [];

    for (let i = 0; i < 400; i++) {
      this.leaves.push(new Leaf(canvas));
    }

    const rootPos = [canvas.width / 2, canvas.height];
    const dir = [0, 1];
    const root = new Branch(rootPos, null, dir);
    this.branches.push(root);
  }

  update() {
    // debugger
    this.leaves.filter(leaf => !leaf.reached).forEach(leaf => {
      let record = 100000;
      let closestBranch = null;
      // find closest branch;

      // console.log(this.branches.filter(branch => !branch.hasBeenSplit && !branch.dead).length);


      this.branches.forEach(branch => {
        const d = distVect(branch.pos, leaf.pos);
        if (d < Tree.MIN_DIST) {
          leaf.reached = true;
          closestBranch = null;
          // console.log("intrat ", leaf);
        }
        else
          if (d < Tree.MAX_DIST && (d < record || closestBranch == null)) {
            closestBranch = branch;
            record = d;
          }
      });

      if (closestBranch != null) {
        // debugger
        let newDir = subVect([...leaf.pos], closestBranch.pos);
        newDir = normalizeVect(newDir, 2);
        closestBranch.dir = addVect(closestBranch.dir, newDir);
        closestBranch.attactionsCount++;
      }
    });

    for (let i = 0, l = this.branches.length; i < l; i++) {
      const branch = this.branches[i];
      if (branch.attactionsCount > 0) {
        divVect(branch.dir, branch.attactionsCount + 1);
        const newPos = addVect([...branch.pos], multVect([...branch.dir], 10));
        const newBranch = new Branch(newPos, branch, [...branch.dir]);
        this.branches.push(newBranch);
        branch.isTip = false;
        branch.hasBeenSplit = true;
      }
      branch.reset();
    };
  }

  draw() {
    this.branches.forEach(branch => {
      if (branch.parent) {
        this.ctx.beginPath();
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(branch.pos[0], branch.pos[1]);
        this.ctx.lineTo(branch.parent.pos[0], branch.parent.pos[1]);
        this.ctx.strokeStyle = "black";

        if (branch.isTip) {
          this.ctx.lineWidth = 2;
          this.ctx.strokeStyle = "blue";
        }
        this.ctx.stroke();
      }
    });
  }
}
