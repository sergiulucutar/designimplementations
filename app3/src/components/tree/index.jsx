import Leaf from "./leaf";
import Branch from "./branch";

import * as colors from "nice-color-palettes";
import { add, dist, div, mult, normalize, sub } from "vectors";
import PattrenGenerator from "./patternGenerator";

const addVect = add(2);
const distVect = dist(2);
const divVect = div(2);
const normalizeVect = normalize(2);
const multVect = mult(2);
const subVect = sub(2);

export default class Tree {
  static get MIN_DIST() {
    return 10;
  }
  static get MAX_DIST() {
    return 100;
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.leaves = [];
    this.branches = [];

    // Place root
    const rootPos = [canvas.width / 2, canvas.height];
    const dir = [0, 1];
    const root = new Branch(rootPos, null, dir);
    this.branches.push(root);

    // PattrenGenerator.random(this);
    // PattrenGenerator.circle(this);
    PattrenGenerator.square(this);

    this.palette = colors[this.random(0, 100)];

    this.isGrowing = true;
  }

  random(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  update() {
    if (this.isGrowing) {
      this.isGrowing = false;
      this.leaves.forEach(leaf => {
        let record = 100000;
        let closestBranch = null;
        // find closest branch;

        this.branches.forEach(branch => {
          const d = distVect(branch.pos, leaf.pos);
          if (d < Tree.MIN_DIST) {
            leaf.reached = true;
            closestBranch = null;
            // console.log("intrat ", leaf);
          } else if (
            d < Tree.MAX_DIST &&
            (d < record || closestBranch == null)
          ) {
            closestBranch = branch;
            record = d;
          }
        });

        if (closestBranch != null) {
          this.isGrowing = true;
          closestBranch.attactions.push(leaf);
          closestBranch.attactionsCount++;
        }
      });

      for (let i = 0, l = this.branches.length; i < l; i++) {
        const branch = this.branches[i];
        if (branch.attactionsCount > 0) {
          let avgDir = [0, 0];
          branch.attactions.forEach(leaf => {
            addVect(avgDir, normalizeVect(subVect([...leaf.pos], branch.pos)));
          });

          divVect(avgDir, branch.attactionsCount + 1);

          const newPos = addVect([...branch.pos], multVect([...avgDir], 10));
          const newBranch = new Branch(
            newPos,
            branch,
            [...avgDir],
            this.random(1, 5)
          );
          this.branches.push(newBranch);
          branch.isTip = false;
          branch.hasBeenSplit = true;
        }
        branch.reset();
      }

      this.leaves.forEach((leaf, index) => {
        if (leaf.reached) {
          this.leaves.splice(index, 1);
        }
      });
    }
  }

  draw() {
    this.branches.forEach(branch => {
      if (branch.parent) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(branch.pos[0], branch.pos[1]);
        this.ctx.lineTo(branch.parent.pos[0], branch.parent.pos[1]);
        // this.ctx.strokeStyle = this.palette[branch.color];
        this.ctx.strokeStyle = this.palette[1];

        // if (branch.isTip) {
        //   this.ctx.lineWidth = 3;
        //   this.ctx.strokeStyle = this.palette[1];
        // }
        this.ctx.stroke();
      }
    });
  }
}
