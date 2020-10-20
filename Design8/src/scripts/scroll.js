import LocomotiveScroll from 'locomotive-scroll';

import { canvas } from './canvas';

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  scrollbarClass: 'scrollbar'
});

scroll.on('scroll', event => {
  canvas.updareImagePositions(-event.scroll.y);
});

scroll.on('call', (value) => {
  const imageIndex = value.split('-')[1];
  canvas.showImage(imageIndex);
});
