import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

export class Car {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.velocity = 0;
        this.steering = 0;
        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        // Bạn có thể thay link này bằng file .glb của Supra
        loader.load('path/to/supra.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.scale.set(1.5, 1.5, 1.5);
            this.scene.add(this.model);
        }, undefined, (error) => {
            // Fallback nếu không có file 3D: Tạo một khối hộp giống dáng xe
            const geo = new THREE.BoxGeometry(2, 0.8, 4.5);
            const mat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            this.model = new THREE.Mesh(geo, mat);
            this.model.position.y = 0.5;
            this.scene.add(this.model);
        });
    }

    update(input) {
        if (!this.model) return;

        // Xử lý gia tốc
        if (input.accel) this.velocity += 0.005;
        else this.velocity *= 0.97; // Ma sát

        this.velocity = Math.min(this.velocity, 0.8);

        // Xử lý lái
        if (this.velocity > 0.01) {
            if (input.left) this.model.rotation.y += 0.04;
            if (input.right) this.model.rotation.y -= 0.04;
        }

        this.model.translateZ(this.velocity);
    }
                    }
      
