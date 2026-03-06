import * as THREE from 'three';
import { World } from './World.js';
import { Car } from './Car.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

const world = new World(scene);
const supra = new Car(scene);

const inputs = { left: false, right: false, accel: false };

// Event Listeners cho Mobile
document.getElementById('btn-left').ontouchstart = () => inputs.left = true;
document.getElementById('btn-left').ontouchend = () => inputs.left = false;
document.getElementById('btn-right').ontouchstart = () => inputs.right = true;
document.getElementById('btn-right').ontouchend = () => inputs.right = false;
document.getElementById('btn-accel').ontouchstart = () => inputs.accel = true;
document.getElementById('btn-accel').ontouchend = () => inputs.accel = false;

function animate() {
    requestAnimationFrame(animate);
    supra.update(inputs);

    // Camera follow car
    if (supra.model) {
        const offset = new THREE.Vector3(0, 4, -10).applyQuaternion(supra.model.quaternion);
        camera.position.copy(supra.model.position).add(offset);
        camera.lookAt(supra.model.position);
    }

    renderer.render(scene, camera);
}

animate();
