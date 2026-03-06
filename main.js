import * as THREE from 'three';

// --- BIẾN TOÀN CỤC ---
let scene, camera, renderer, car, clock;
let speed = 0;
const maxSpeed = 0.5;
const acceleration = 0.005;
const friction = 0.98;
const keys = { left: false, right: false, gas: false };

init();
animate();

function init() {
    // 1. Khởi tạo Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Bầu trời xanh
    scene.fog = new THREE.Fog(0x87ceeb, 10, 100);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, -10);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // 4. Ánh sáng
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // 5. Tạo Đường đi (Map đẹp)
    createTrack();

    // 6. Tạo Xe (Toyota Supra Placeholder)
    // Để ra hình Supra thật, bạn dùng GLTFLoader tại đây
    const carGeometry = new THREE.BoxGeometry(2, 1, 4);
    const carMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.y = 0.5;
    scene.add(car);

    clock = new THREE.Clock();
    setupControls();
}

function createTrack() {
    // Mặt đất
    const groundGeo = new THREE.PlaneGeometry(1000, 1000);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x228b22 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Đường nhựa
    const roadGeo = new THREE.PlaneGeometry(10, 1000);
    const roadMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.01;
    scene.add(road);
}

function setupControls() {
    // Keyboard cho PC
    window.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowUp') keys.gas = true;
        if(e.key === 'ArrowLeft') keys.left = true;
        if(e.key === 'ArrowRight') keys.right = true;
    });
    window.addEventListener('keyup', (e) => {
        if(e.key === 'ArrowUp') keys.gas = false;
        if(e.key === 'ArrowLeft') keys.left = false;
        if(e.key === 'ArrowRight') keys.right = false;
    });

    // Touch cho Mobile
    document.getElementById('gas').addEventListener('touchstart', () => keys.gas = true);
    document.getElementById('gas').addEventListener('touchend', () => keys.gas = false);
    // Tương tự cho left/right...
}

function animate() {
    requestAnimationFrame(animate);

    // Vật lý xe
    if (keys.gas) speed += acceleration;
    else speed *= friction;

    if (speed > maxSpeed) speed = maxSpeed;

    car.translateZ(speed);

    if (keys.left && speed > 0.01) car.rotation.y += 0.03;
    if (keys.right && speed > 0.01) car.rotation.y -= 0.03;

    // Camera đuổi theo xe
    const relativeCameraOffset = new THREE.Vector3(0, 3, -8);
    const cameraOffset = relativeCameraOffset.applyMatrix4(car.matrixWorld);
    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;
    camera.lookAt(car.position);

    document.getElementById('speed').innerText = Math.round(speed * 400);
    renderer.render(scene, camera);
      }

