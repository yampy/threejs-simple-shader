import 'normalize.css';
import * as THREE from 'three';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial'
import vertexSource from './shader/shader.vert';
import fragmentSource from './shader/shader.frag';

let container, camera, scene, renderer;
let uniforms, material, mesh;
let startTime = Date.now();

function init() {
    // Setup Renderer 
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById('webGLContainer')
        .appendChild(renderer.domElement);

    // Setup Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // Setup Scene
    scene = new THREE.Scene();
}

function addMesh() {
    uniforms = {
        time: { type: "f", value: 1.0 }
    };

    material = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexSource,
        fragmentShader: fragmentSource
    });

    const planeGeo = new THREE.PlaneGeometry(2, 2);
    mesh = new THREE.Mesh(planeGeo, material);
    scene.add(mesh);
}

function render() {
    let elapsedMilliseconds = Date.now() - startTime;
    let elapsedSeconds = elapsedMilliseconds / 1000.;
    uniforms.time.value = 60. * elapsedSeconds;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

init();
addMesh();
render();