import './main.scss';

import * as THREE from 'three';

import World from './componnets/world';
import Spires from './componnets/spire';
import Hero from './componnets/hero';
import Utils from './componnets/utils';
import Barrier from './componnets/barrier';
import Collectables from './componnets/collectanbles';
import { Sun, Sky } from './componnets/sun';

var scene, camera, renderer, domEl;

function createScene() {
  domEl = document.querySelector('main');

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0CFFFF, 1, 1000);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 300;

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
var world, hero, spires, barrier, collectables;
var sky;
function createWorld() {
  sky = new Sky(document.querySelector('.sky'));

  world = new World(camera);
  scene.add(world.mesh);

  spires = new Spires();
  world.mesh.add(spires.mesh);

  hero = new Hero();
  scene.add(hero.mesh);
}

function createLights() {
  const generalLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(generalLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.position.set(100, 450, 100);
  dirLight.castShadow = true;
  // define the visible area of the projected shadow
  dirLight.shadow.camera.left = -400;
  dirLight.shadow.camera.right = 400;
  dirLight.shadow.camera.top = 400;
  dirLight.shadow.camera.bottom = -400;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 1000;

  // define the resolution of the shadow; the higher the better, 
  // but also the more expensive and less performant
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);
}

var speed = 0;

function init() {

  createScene();

  // objects
  createWorld();
  createLights();

  document.addEventListener('mousemove', event => {
    const normalizedPosition = Utils.normalizeMousePosition([event.clientX, event.clientY]);

    // camera.position.z = 150 + 40 * normalizedPosition[0];
    speed = normalizedPosition[0];

    hero.move(normalizedPosition);
  });

  loop();
}

const interval = 1000 / 60;
let then = Date.now();
function loop() {
  requestAnimationFrame(loop);

  const now = Date.now();
  const delta = now - then;
  if (delta > interval) {
    then = now - (delta % interval);
    world.mesh.rotation.y += .005 + .003 * speed;
    // collect();
    spires.update();
    hero.update();

    renderer.render(scene, camera);
  }
}

window.onload = init.bind(this);
