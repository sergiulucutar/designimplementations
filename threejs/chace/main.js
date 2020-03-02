import './main.scss';

import * as THREE from 'three';

import World from './componnets/world';
import Spires from './componnets/spire';
import Hero from './componnets/hero';
import Utils from './componnets/utils';
import Collectables from './componnets/collectanbles';
import { Sky } from './componnets/sun';
import { Clouds } from './componnets/clouds';
import Enemies from './componnets/enemy';
import { UI } from './componnets/ui';


class Game {
  constructor() {
    this.speed = .005;
  }
}
var game = new Game();
var scene, camera, renderer, domEl;
function createScene() {
  domEl = document.querySelector('main');

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0CFFFF, 1, 1000);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 400;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;

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
var world, hero, spires, enemies, collectables;
var sky, clouds;
var ui;
var distance = 0, spawDistance = 0;
function createWorld() {
  sky = new Sky(document.querySelector('.sky'));

  world = new World(camera);
  scene.add(world.mesh);

  spires = new Spires();
  world.mesh.add(spires.mesh);

  clouds = new Clouds();
  world.mesh.add(clouds.mesh);

  hero = new Hero();
  scene.add(hero.smokeMesh);
  scene.add(hero.mesh);

  enemies = new Enemies();
  world.mesh.add(enemies.mesh);

  collectables = new Collectables();
  world.mesh.add(collectables.mesh);

  ui = new UI();
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


function init() {
  createScene();
  createWorld();
  createLights();
  document.addEventListener('mousemove', event => {
    const normalizedPosition = Utils.normalizeMousePosition([event.clientX, event.clientY]);

    game.speed = .005 + 0.003 * normalizedPosition[0];
    camera.position.z = 400 + (-50 * -normalizedPosition[0]);

    hero.move(normalizedPosition);
  });

  loop();
}

const frameInterval = 1000 / 60;
let then = Date.now();
function loop() {
  requestAnimationFrame(loop);

  const now = Date.now();
  const delta = now - then;
  if (delta > frameInterval) {
    then = now - (delta % frameInterval);
    world.mesh.rotation.y -= game.speed;
    distance += 1;
    hero.energy -= .05;

    // if(distance % 1000 === 0) {
    //   game.speed += 0.01;
    // }

    if (spawDistance + 100 < distance) {
      spawDistance = distance;
      collectables.spawn(world.mesh.rotation.y);
      enemies.spawn(world.mesh.rotation.y)
    }

    hero.update();
    enemies.checkCollisions(hero);
    collectables.checkCollisions(hero);

    checkForLevelComplete();
    ui.setEvergy(hero.energy);

    renderer.render(scene, camera);
  }
}

window.onload = init.bind(this);


// Stats
var state = {
  level: 1,
  energy: 100
}
function checkForLevelComplete() {
  if (distance > 4000) {
    ui.setLevel(++state.level);
    distance = 0;
  }
}