
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,  0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial( {color: 0xFF0000} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var light = new THREE.PointLight();
light.position.set(10,10,10);
scene.add(light);

var ambient = new THREE.AmbientLight(0xFFFFFF, 0.7);
scene.add(ambient); 

camera.position.set(0, 2, 2);
camera.lookAt(0,0,0);

var i = 0;



// Wireframe
var wireGeo = new MeshLine();
wireGeo.setGeometry(geometry, function(p) {return 2;} );
var wireMaterial = new MeshLineMaterial();
var mesh = new THREE.Mesh( wireGeo.geometry, material);
cube.add(mesh);
mesh.renderOrder = 1;
//  var wireMat = new THREE.LineBasicMaterial({color:0x000000, linewidth: 5});
//  var wireframe = new THREE.LineSegments(wireGeo, wireMat);
//  cube.add(wireframe);

var angle = 0;

function animate() {
    requestAnimationFrame(animate);
    angle += 0.01;
    angle = angle % (2 * Math.PI); 
    cube.rotation.x = Math.sin(angle) + i*4;
    cube.rotation.y = -Math.cos(angle) + i*4;
    material.color.setHSL(i,1,0.5);
    i += 0.003;
    renderer.render(scene, camera);
    
};

animate(); 



// var scene = new THREE.Scene();
// 			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// 			var renderer = new THREE.WebGLRenderer();
// 			renderer.setSize( window.innerWidth, window.innerHeight );
// 			document.body.appendChild( renderer.domElement );

// 			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// 			var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
// 			var cube = new THREE.Mesh( geometry, material );
// 			scene.add( cube );

// 			camera.position.z = 5;

// 			function animate() {
// 				requestAnimationFrame( animate );

// 				cube.rotation.x += 0.001;
// 				cube.rotation.y += 0.002;

// 				renderer.render(scene, camera);
// 			};

// 			animate();