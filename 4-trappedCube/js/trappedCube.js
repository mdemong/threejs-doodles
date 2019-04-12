let camera, scene, renderer;
let geometry, material, mesh;

let width, height;


let position, velocity, accel;
let accelMagnitude;

let mouse = new THREE.Vector2();
let caster = new THREE.Raycaster();
let plane;


init();
animate();

function init() {
    
    width = window.innerWidth;
    height = window.innerHeight;
    accelMagnitude = 1;

    position = new THREE.Vector3(0, 0, 0);
    velocity = new THREE.Vector3(0, 0, 0);
    accel = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    geometry = new THREE.BoxBufferGeometry(.1, .1, .1);
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

    // controls = new THREE.OrbitControls( camera );
    // //controls.update() must be called after any manual changes to the camera's transform
    // camera.position.set( 0, 20, 100 );
    //controls.update();

   // plane = new THREE.Plane

}

function onMouseMove( event ) {

    // Code from three.js Raycaster example
    // https://threejs.org/docs/#api/en/core/Raycaster.intersectObject

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
function castRay() {
    caster.setFromCamera(mouse, camera);
   // let intersects = caster.intersectObject()
}

function integrate() {
    position.add(velocity);
    velocity.add(accel);
}

function animate() {

    requestAnimationFrame(animate);
    
    //accel.subVectors();
    castRay();

    mesh.rotation.x += 0.05;
    mesh.rotation.y += 0.05;

    // // required if controls.enableDamping or controls.autoRotate are set to true
	// controls.update();

    console.log(mouse, )
    renderer.render(scene, camera);

}