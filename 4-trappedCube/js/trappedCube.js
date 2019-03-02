let camera, scene, renderer;
let geometry, material, mesh;

let width, height;

let controls;

init();
animate();

function init() {
    
    width = window.innerWidth;
    height = window.innerHeight;

    scene = new THREE.Scene();

    geometry = new THREE.ConeBufferGeometry(.1, .2);
    material = new THREE.MeshNormalMaterial();

    // Mesh is geometry + material
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    // Add our renderer to our HTML DOM
    document.body.appendChild(renderer.domElement);

    // The camera will be combined with the scene in the renderer.
    // It does not need to be added to the scene.

    // initialize camera with FOV, aspect ratio, near plane, far plane
    camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    controls = new THREE.OrbitControls( camera );
    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set( 0, 20, 100 );
    controls.update();

}

function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.1;

    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    renderer.render(scene, camera);

}