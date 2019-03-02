/*
    TODO: I need some sort of way to update the normal vectors of the plane... 
    It seems like they aren't being modified by vertex changes.
*/

let camera, scene, renderer;
let geometry, material, plane_mesh;
let offset = 0;

const HEIGHT_SCALE_FACTOR = 0.001;
const FREQUENCY = 1
const SHIFT_SPEED = .1;


init();
animate();


function init() {

    // CAMERA
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);

    camera.position.y = -1;
    camera.position.z = 1;
    camera.lookAt(0, 0, 0);


    // SCENE
    scene = new THREE.Scene();


    // PLANE
    geometry = new THREE.PlaneGeometry(.2, 1, 1, 30);
    material = new THREE.MeshNormalMaterial();
    plane_mesh = new THREE.Mesh(geometry, material);
    scene.add(plane_mesh);


    // HELPERS
    var axesHelper = new THREE.AxesHelper(5);
    var faceNormHelper = new THREE.FaceNormalsHelper(plane_mesh, 2, 0x00ff00, 1);
    var vertNormHelper = new THREE.VertexNormalsHelper(plane_mesh, 2, 0xff0000, 1);

    scene.add(axesHelper);
    scene.add(faceNormHelper);
    scene.add(vertNormHelper);


    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);
    updateVertices();
    moveCamera();
    renderer.render(scene, camera);

}

function moveCamera(){

    camera.position.x += .001;
    if (camera.position.x > 1.5) camera.position.x = 0;
    camera.lookAt(0, 0, 0);

}

function updateVertices() {

    for (let i = 0; i < geometry.vertices.length - 1; i += 2) {
        let vert = geometry.vertices[i];
        let vert2 = geometry.vertices[i + 1];
        let k = Math.sin(FREQUENCY * (i + offset)) * HEIGHT_SCALE_FACTOR;
        var toAdd = new THREE.Vector3(0, 0, k);
        vert.add(toAdd);
        vert2.add(toAdd);
    }
    geometry.verticesNeedUpdate = true;
    geometry.normalsNeedUpdate = true;
    material.needsUpdate = true;
    offset += SHIFT_SPEED;

}