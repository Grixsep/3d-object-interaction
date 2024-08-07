// Basic Three.js setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xADD8E6); // Set background color to light blue

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
directionalLight.castShadow = false; // Ensure no shadows are cast
scene.add(directionalLight);

// Load the .obj model
const loader = new THREE.OBJLoader();
loader.load('models/shuttle1.obj', function (object) {
    object.scale.set(0.01, 0.01, 0.01); // Scale down the model
    object.position.set(0, 0, 0); // Adjust position if needed
    object.traverse(function (node) { // Disable shadow casting and receiving on all child nodes
        if (node.isMesh) {
            node.castShadow = false;
            node.receiveShadow = false;
        }
    });
    scene.add(object);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.error('An error happened', error);
});

// Initial camera position
camera.position.set(0, 5, 10); // Adjust the camera position if needed

// OrbitControls setup
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.3;
controls.screenSpacePanning = false; // Disable panning
controls.minDistance = 10; // Minimum zoom distance
controls.maxDistance = 70; // Maximum zoom distance

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}
animate();

// Responsive design
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
