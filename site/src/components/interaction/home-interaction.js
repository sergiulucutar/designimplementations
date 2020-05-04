import { Interaction3d } from './interaction';

export class HomeInteraction extends Interaction3d {
  constructor(domEl) {
    super(domEl);
  }

  init() {
    super.init(5);
  }
}
