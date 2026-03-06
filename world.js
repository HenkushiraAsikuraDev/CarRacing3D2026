import * as THREE from 'three';

export class World {
    constructor(scene) {
        this.scene = scene;
        this.createEnvironment();
        this.createRoad();
    }

    createEnvironment() {
        // Ánh sáng thành phố về đêm
        const ambientLight = new THREE.AmbientLight(0x4040ff, 0.5);
        this.scene.add(ambientLight);

        const sun = new THREE.DirectionalLight(0xff00ff, 1);
        sun.position.set(50, 100, 50);
        this.scene.add(sun);

        // Tạo sương mù để tăng chiều sâu cho map
        this.scene.fog = new THREE.FogExp2(0x000011, 0.015);
    }

    createRoad() {
        const textureLoader = new THREE.TextureLoader();
        const roadTexture = textureLoader.load('https://threejs.org/examples/textures/grid.png');
        roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
        roadTexture.repeat.set(1, 100);

        const roadGeo = new THREE.PlaneGeometry(20, 2000);
        const roadMat = new THREE.MeshPhongMaterial({ map: roadTexture, color: 0x222222 });
        const road = new THREE.Mesh(roadGeo, roadMat);
        road.rotation.x = -Math.PI / 2;
        this.scene.add(road);
        
        // Thêm dải phân cách phát sáng (Neon style)
        const lineGeo = new THREE.PlaneGeometry(0.2, 2000);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const leftLine = new THREE.Mesh(lineGeo, lineMat);
        leftLine.position.set(-9.8, 0.05, 0);
        leftLine.rotation.x = -Math.PI / 2;
        this.scene.add(leftLine);
    }
          }

