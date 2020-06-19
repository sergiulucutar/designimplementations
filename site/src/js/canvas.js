window.interactinWorker = null;

if (OffscreenCanvas) {
  interactinWorker = new Worker('worker.js');
} else {
  throw new Error('Offscren canvas not supported.');
}

const homeCanvas = document.querySelector('.home .interaction canvas');
const contactCanvas = document.querySelector('.contact .interaction canvas');

const isOnMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

// HOME INTERACTIOn EVENTS
homeCanvas.addEventListener('mousedown', ({ offsetX, offsetY }) =>
  interactinWorker.postMessage({
    message: 'homeMouseDown',
    payload: {
      offsetX,
      offsetY,
      isOnMobile
    }
  })
);
homeCanvas.addEventListener('mousemove', ({ offsetX, offsetY }) =>
  interactinWorker.postMessage({
    message: 'homeMouseMove',
    payload: {
      offsetX,
      offsetY
    }
  })
);
homeCanvas.addEventListener('mouseup', () =>
  interactinWorker.postMessage({
    message: 'homeMouseUp'
  })
);
homeCanvas.addEventListener('mouseleave', () =>
  interactinWorker.postMessage({
    message: 'homeMouseUp'
  })
);

// CONTACT INTERACTIOn EVENTS
contactCanvas.addEventListener('mousedown', ({ offsetX, offsetY }) =>
  interactinWorker.postMessage({
    message: 'contactMouseDown',
    payload: {
      offsetX,
      offsetY,
      isOnMobile
    }
  })
);
contactCanvas.addEventListener('mousemove', ({ offsetX, offsetY }) =>
  interactinWorker.postMessage({
    message: 'contactMouseMove',
    payload: {
      offsetX,
      offsetY
    }
  })
);
contactCanvas.addEventListener('mouseup', () =>
  interactinWorker.postMessage({
    message: 'contactMouseUp'
  })
);
contactCanvas.addEventListener('mouseleave', () =>
  interactinWorker.postMessage({
    message: 'contactMouseUp'
  })
);

const home = {
  el: document.querySelector('.home .interaction'),
  canvas: homeCanvas.transferControlToOffscreen(),
  textCanvas: document.createElement('canvas').transferControlToOffscreen()
};

const contact = {
  el: document.querySelector('.contact .interaction'),
  canvas: contactCanvas.transferControlToOffscreen(),
  textCanvas: document.createElement('canvas').transferControlToOffscreen()
};

interactinWorker.postMessage(
  {
    message: 'setup',
    payload: {
      homeInteraction: {
        canvas: home.canvas,
        textCanvas: home.textCanvas,
        bounds: [home.el.offsetWidth, home.el.offsetHeight]
      },
      contactInteraction: {
        canvas: contact.canvas,
        textCanvas: contact.textCanvas,
        bounds: [contact.el.offsetWidth, contact.el.offsetHeight]
      }
    }
  },
  [home.canvas, home.textCanvas, contact.canvas, contact.textCanvas]
);

window.addEventListener('blur', () =>
  interactinWorker.postMessage({
    message: 'stopLoop'
  })
);

window.addEventListener('focus', () =>
  interactinWorker.postMessage({
    message: 'startLoop'
  })
);
