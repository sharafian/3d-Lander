var Lander = function(ground, scene, camera, keys) {

	this.GRAVITY = -0.1;
	this.side = 4;
	this.height = 3;

	this.geometry = new THREE.BoxGeometry(this.side, this.height, this.side);
	this.material = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
	this.object = new THREE.Mesh(this.geometry, this.material);
	scene.add(this.object);
	
	this.jgeometry = new THREE.PlaneGeometry(1, 1);
	this.jmaterial = new THREE.MeshBasicMaterial({color: 0x111111});
	this.jankyshadow = new THREE.Mesh(this.jgeometry, this.jmaterial);
	scene.add(this.jankyshadow);
	this.jankyshadow.scale.x = this.side;
	this.jankyshadow.scale.z = this.side;
	this.jankyshadow.rotation.x = -Math.PI / 2;
	this.jankyshadow.position.y = 0.1;

	this.camera = camera;
	this.keys = keys;
	this.ground = ground;

	this.object.position.y = 10;
	this.camera.position.y = 20;
	this.camera.position.z = 10;
	this.camera.rotation.x = -Math.PI / 4;

	this.vx = 0.0;
	this.vy = 0.0;
	this.vz = 0.0;
	
	this.rx = 0.0;
	this.ry = 0.0;
	this.rz = 0.0;
}

Lander.prototype.applyForce = function(x, y, z) {
	
	this.vx += x;
	this.vy += y;
	this.vz += z;
}
Lander.prototype.applyRot = function(x, y, z) {
	
	this.rx += x;
	this.ry += y;
	this.rz += z;
}

Lander.prototype.move = function(dt) {
	
	var lander = this;
	[ lander.object, lander.camera ].forEach(function(elem, i, arr) {

		elem.position.x += lander.vx * dt;	
		elem.position.y += lander.vy * dt;	
		elem.position.z += lander.vz * dt;

	});
	this.object.rotation.x += this.rx * dt;	
	this.object.rotation.y += this.ry * dt;	
	this.object.rotation.z += this.rz * dt;	

	this.jankyshadow.position.x = this.object.position.x;
	this.jankyshadow.position.z = this.object.position.z;

/*	this.jankyshadow.scale.x = 4 * Math.sin(this.object.rotation.x) + 3 * Math.cos(this.object.rotation.x);
	this.jankyshadow.scale.z = 4 * Math.sin(this.object.rotation.z) + 3 * Math.cos(this.object.rotation.z);*/

	this.jankyshadow.rotation.x = this.object.rotation.x - Math.PI / 2;
	this.jankyshadow.rotation.z = this.object.rotation.z;
}

/* keycodes */
var W = 87;
var A = 65;
var S = 83;
var D = 68;
var SPACE = 32;

Lander.prototype.update = function(dt) {

	if (isNaN(dt)) return;

	if (this.keys[W]) this.applyRot(0.1 * dt, 0, 0);	
	if (this.keys[A]) this.applyRot(0, 0, 0.1 * dt);	
	if (this.keys[S]) this.applyRot(-0.1 * dt, 0, 0);	
	if (this.keys[D]) this.applyRot(0, 0, -0.1 * dt);	

	if (this.object.position.y < this.ground.getHeightInArea(this.object.position.x, this.object.position.z)) return;
	
	this.applyForce(0, this.GRAVITY * dt, 0);
	this.move(dt);
}
