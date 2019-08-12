const STAR_SIZE = 0.12;

let camera, scene, composer;
let farClip = 100;
let density = 10;
let speed = 0.2;
let spread = 500;
let abbEffect, abbEffectPass;

// Treat like a queue; push and shift 
let stars = []

init();
animate();

function init() {
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, farClip);
    camera.position.set(0, 0, 0);
    for (let i = 0; i < farClip; i += speed) {
        addMultStars(-i);
    }

    abbEffect = new POSTPROCESSING.ChromaticAberrationEffect();
    abbEffectPass = new POSTPROCESSING.EffectPass(camera, abbEffect);
    
    abbEffectPass.renderToScreen = true;

    console.log(abbEffect);
    console.log(abbEffectPass);

    composer = new POSTPROCESSING.EffectComposer(new THREE.WebGLRenderer({ antialias: true, canvas: jsCanvas }));
    composer.setSize(window.innerWidth, window.innerHeight);

    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    // composer.addPass(abbEffectPass);

    window.addEventListener("resize", onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    addMultStars(camera.position.z - farClip);
    animateStars();
    camera.translateZ(-speed);
    composer.render(scene, camera);
    removeLayer();
}

function animateStars() {
    for (var star of stars) {
        let theta = (star.position.z - camera.position.z) / 8
        star.position.y += Math.sin(theta) * .035;
        star.position.x += Math.cos(theta) * .035;
    }
}

function addMultStars(posZ) {
    for (let i = 0; i < density; i++) {
        addStar(posZ);
    }
}

function addStar(posZ) {
    let starGeom = new THREE.SphereBufferGeometry(STAR_SIZE);
    let material = new THREE.MeshBasicMaterial;
    let star = new THREE.Mesh(starGeom, material);

    posX = Math.random() * spread - (spread / 2);
    posY = Math.random() * spread - (spread / 2);
    star.position.set(posX, posY, posZ);
    scene.add(star);
    stars.push(star);
}

function removeLayer() {
    for (let i = 0; i < density; i++) {
        scene.remove(scene.children[0]);
        stars.shift();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    composer.setSize( window.innerWidth, window.innerHeight );
}
