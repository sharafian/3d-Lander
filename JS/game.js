var WIDTH = 640;
var HEIGHT = 480;

var scene;
var camera;

var lander;
var landScape;

var now;
var last;

var KEYS = new Array(256);
document.addEventListener("keydown", function (e) {
    KEYS[e.keyCode] = true;
});

document.addEventListener("keyup", function (e) {
    KEYS[e.keyCode] = false;
});

var renderer = new THREE.WebGLRenderer();
renderer.setSize( WIDTH, HEIGHT);

window.onload = function () {
    document.body.appendChild( renderer.domElement);
init();
main();
}

function init () {
    var light = new THREE.PointLight( 0xffffff, 1, 200);
    light.position.set( -50, 150, -50 );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, .1, 1000);
    scene.add( light );
    landScape = new LandScape(scene);
    lander = new Lander( landScape, scene, camera, KEYS );
}

function main() {
    now = Date.now();
    dt = (now-last) / 1000;
    last = Date.now();
    
    lander.update(dt);
    
    requestAnimationFrame( main );
	renderer.render( scene, camera );
}

window.onload = function () {
    document.getElementById("CANVAS").appendChild( renderer.domElement);
    init();
    main();
}
