import './main.scss';

import * as THREE from 'three';

import World from './componnets/world';
import Spires from './componnets/spire';

var scene, camera, renderer, domEl;

function createScene() {
  domEl = document.querySelector('main');

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xff0000, 100, 950);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.x = 0;
  camera.position.y = 100;
  camera.position.z = 120;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  domEl.appendChild(renderer.domElement);

  window.addEventListener('resize', handleResize, false);
}

function handleResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}


// Objects
var world;

function createWorld() {
  world = new World();
  scene.add(world.mesh);

  const spires = new Spires();
  scene.add(spires);
}

function createLights() {
  const generalLight = new THREE.AmbientLight(0xffffff, .9);
  scene.add(generalLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-20, 40, 20);
  dirLight.castShadow = true;
  scene.add(dirLight);
}

function init() {

  createScene();

  // objects
  createWorld();
  createLights();

  // loop();

  renderer.render(scene, camera);
}

window.onload = init.bind(this);

