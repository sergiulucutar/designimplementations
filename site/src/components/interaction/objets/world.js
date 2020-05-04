import * as CANNON from 'cannon';

export class World {
  constructor(bounds, cameraSize) {
    this.world = new CANNON.World();
    this.world.gravity.z = -9.8;

    this.bounds = {
      top: new CANNON.Body({
        mass: 0,
      }),
      bottom: new CANNON.Body({
        mass: 0,
      }),
      left: new CANNON.Body({
        mass: 0,
      }),
      right: new CANNON.Body({
        mass: 0,
      }),
      floor: new CANNON.Body({
        mass: 0,
      }),
    };

    const groundShape = new CANNON.Plane();
    this.bounds.top.addShape(groundShape);
    this.bounds.bottom.addShape(groundShape);
    this.bounds.left.addShape(groundShape);
    this.bounds.right.addShape(groundShape);
    this.bounds.floor.addShape(groundShape);

    this.bounds.bottom.position.y = -bounds[1] / cameraSize;
    this.bounds.bottom.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );

    this.bounds.top.position.y = bounds[1] / cameraSize;
    this.bounds.top.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      Math.PI / 2
    );

    this.bounds.left.position.x = -bounds[0] / cameraSize;
    this.bounds.left.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      Math.PI / 2
    );

    this.bounds.right.position.x = bounds[0] / cameraSize;
    this.bounds.right.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      -Math.PI / 2
    );

    this.bounds.floor.position.z -= 5;

    this.world.addBody(this.bounds.bottom);
    this.world.addBody(this.bounds.top);
    this.world.addBody(this.bounds.left);
    this.world.addBody(this.bounds.right);
    this.world.addBody(this.bounds.floor);
  }
}
