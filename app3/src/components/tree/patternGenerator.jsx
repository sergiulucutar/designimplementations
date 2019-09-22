import Leaf from "./leaf";

import { dist } from "vectors";
const distVect = dist(2);

export default class PattrenGenerator {
  static get maxPoints() {
    return 1000;
  }

  static circle(tree) {
    const R = tree.canvas.width / 4;

    for (let i = 0; i < PattrenGenerator.maxPoints; i++) {
      const r = R * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;

      tree.leaves.push(
        new Leaf([
          tree.canvas.width / 2 + r * Math.cos(theta),
          tree.canvas.height / 2 + r * Math.sin(theta)
        ])
      );
    }

    PattrenGenerator.addTrunck(tree, [
      tree.canvas.width / 2,
      tree.canvas.height / 2
    ]);
  }

  static random(tree) {
    for (let i = 0; i < PattrenGenerator.maxPoints; i++) {
      const pos = [
        PattrenGenerator.getRandom(0, tree.canvas.width),
        PattrenGenerator.getRandom(0, tree.canvas.height)
      ];
      tree.leaves.push(new Leaf(pos));
    }
  }

  static square(tree) {
    const bounds = [tree.canvas.width / 2, tree.canvas.height / 2];
    const origin = [
      tree.canvas.width / 2 - bounds[0] / 2,
      tree.canvas.height / 2 - bounds[1] / 2
    ];

    for (let i = 0; i < PattrenGenerator.maxPoints; i++) {
      tree.leaves.push(
        new Leaf([
          PattrenGenerator.getRandom(origin[0], origin[0] + bounds[0]),
          PattrenGenerator.getRandom(origin[1], origin[1] + bounds[1])
        ])
      );
    }

    PattrenGenerator.addTrunck(tree, [
      tree.canvas.width / 2,
      tree.canvas.height / 2
    ]);
  }

  static getRandom(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static addTrunck(tree, fromPos) {
    fromPos = [...fromPos];
    while (distVect(fromPos, tree.branches[0].pos) > 100) {
      fromPos = [fromPos[0], fromPos[1] + 20];
      tree.leaves.push(new Leaf(fromPos));
    }
  }
}
