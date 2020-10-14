import gsap from 'gsap/gsap-core';
import * as PIXI from 'pixi.js';

const options = {
  loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
  xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB
};
const loader = PIXI.Loader.shared;

const loaderDisplayedObj = {
  progressValue: 0,
  el: document.querySelector('#loader_progress')
};
loader.onProgress.add(({ progress }) => {
  // displayedValue = progress;
  gsap.killTweensOf(loaderDisplayedObj);
  gsap.to(loaderDisplayedObj, 0.4, {
    progressValue: progress,
    onUpdate: () => loaderDisplayedObj.el.innerText = Math.round(loaderDisplayedObj.progressValue)
  })
});

loader
  .add('displacement', '/images/displacement.jpg', options)
  .add('image0', '/images/image0.jpg', options)
  .add('image1', '/images/image1.jpg', options)
  .add('image2', '/images/image2.jpg', options)
  .add('image3', '/images/image3.jpg', options)
  .add('image4', '/images/image4.jpg', options)
  .add('image5', '/images/image5.jpg', options)
  .add('image6', '/images/image6.jpg', options)
  .add('image7', '/images/image7.jpg', options);

loader.load();
