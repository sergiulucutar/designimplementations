import './main.scss';

import * as THREE from 'three';

import World from './componnets/world';
import Spires from './componnets/spire';
import Hero from './componnets/hero';
import Enemy from './componnets/enemy';

var scene, camera, renderer, domEl;

function createScene() {
  domEl = document.querySelector('main');

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xd6eae6, 10,350);

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
var world, hero, spires;

function createWorld() {
  world = new World();
  scene.add(world.mesh);

  spires = new Spires();
  // scene.add(spires.mesh);
  world.mesh.add(spires.mesh);

  hero = new Hero();
  scene.add(hero.mesh);

  // const enemy = new Enemy();
  // scene.add(enemy.mesh);
}

function createLights() {
  const generalLight = new THREE.AmbientLight(0xffffff, .5);
  scene.add(generalLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-20, 40, 20);
  dirLight.castShadow = true;
  // // define the visible area of the projected shadow
	// dirLight.shadow.camera.left = -400;
	// dirLight.shadow.camera.right = 400;
	// dirLight.shadow.camera.top = 400;
	// dirLight.shadow.camera.bottom = -400;
	// dirLight.shadow.camera.near = 1;
	// dirLight.shadow.camera.far = 1000;

	// // define the resolution of the shadow; the higher the better, 
	// // but also the more expensive and less performant
	// dirLight.shadow.mapSize.width = 2048;
	// dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);
}

function init() {

  createScene();

  // objects
  createWorld();
  createLights();

  document.addEventListener('mousemove', event => {
    hero.move(event);
  });

  document.addEventListener('click', event => {
    hero.update(event);
  });

  loop();
}

function loop() {
  requestAnimationFrame(loop);

  world.mesh.rotation.z += .002;
  spires.update();

  renderer.render(scene, camera);
}

window.onload = init.bind(this);

