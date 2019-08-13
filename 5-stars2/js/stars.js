const STAR_SIZE = 0.2;
const clock = new THREE.Clock();

let camera, scene, composer;
let nearClip = 0.1
let farClip = 100;
let density = 10;
let speed = 0.2;
let spread = 500;
let abbEffect, abbEffectPass, renderPass, bloomEffectPass;
let abbIndex = 0;
let fog;

// Treat like a queue; push and shift 
let stars = []

init();
animate();

function init() {
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, nearClip, farClip);
    camera.position.set(0, 0, 0);
    for (let i = 0; i < farClip; i += speed) {
        addMultStars(-i);
    }

    fog = new THREE.Fog(new THREE.Color(0x000000), nearClip, farClip);
    scene.fog = fog;

    renderPass = new POSTPROCESSING.RenderPass(scene, camera);

    abbEffect = new POSTPROCESSING.ChromaticAberrationEffect();
    abbEffect.offset = new THREE.Vector2(.0015, 0);
    abbEffectPass = new POSTPROCESSING.EffectPass(camera, abbEffect);

    bloomEffectPass = new POSTPROCESSING.EffectPass(camera, new POSTPROCESSING.BloomEffect());

    console.log(abbEffect);
    console.log(abbEffectPass);
    console.log(renderPass);

    composer = new POSTPROCESSING.EffectComposer(new THREE.WebGLRenderer({ antialias: true, canvas: jsCanvas }));
    composer.setSize(window.innerWidth, window.innerHeight);

    composer.addPass(renderPass);
    composer.addPass(bloomEffectPass);
    composer.addPass(abbEffectPass);
    
    renderPass.renderToScreen = false;
    bloomEffectPass.renderToScreen = false;
    abbEffectPass.renderToScreen = true;
    
    window.addEventListener("resize", onWindowResize, false);
}

function animate() {
    deltaT = clock.getDelta()
    requestAnimationFrame(animate);
    addMultStars(camera.position.z - farClip);
    animateStars();
    camera.translateZ(-speed);
    modulateAbberation(deltaT);
    composer.render(deltaT);
    removeLayer();
}

function animateStars() {
    for (var star of stars) {
        let theta = (star.position.z - camera.position.z) / 8
        star.position.y += Math.sin(theta) * .035;
        star.position.x += Math.cos(theta) * .035;
    }
}

function modulateAbberation(deltaT) {
    abbIndex += deltaT * 1.5
    abbEffect.offset = new THREE.Vector2(Math.abs(Math.sin(abbIndex) * 0.0007), 0);
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
