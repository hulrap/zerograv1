console.log(bubble)
group.name = "bubble";
// Sphere-Geometrie erstellen

const canvas = document.createElement('canvas');
canvas.id = 'myCanvas';
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

let draggables = [];
let r = 250;
for (let i = 0; i < 6; i++) {
  let angle = Math.PI * 2 / 6 * i;
  draggables.push(new THREE.Vector3(300 + r * Math.cos(angle), 300 + r * Math.sin(angle), Math.random() * 100)); // Added Z-coordinate
}

let draggableIndex = -1;
function withinCircle(c, r, p) {
  return (c.x - p.x) ** 2 + (c.y - p.y) ** 2 < r ** 2;
}
function clickLocation(e) {
  return { x: e.offsetX, y: e.offsetY };
}

let clickRadius = 6;
canvas.addEventListener('mousedown', e => {
  for (let i = 0; i < draggables.length; i++) {
    let d = draggables[i];
    if (withinCircle(d, clickRadius, clickLocation(e))) {
      draggableIndex = i;
      return;
    }
  }
  draggableIndex = -1;
});

canvas.addEventListener('mousemove', e => {
  if (draggableIndex >= 0) {
    draggables[draggableIndex] = clickLocation(e);
  }
});

canvas.addEventListener('mouseup', e => {
  draggableIndex = -1;
});

function createSpline(points) {
    return new THREE.CatmullRomCurve3(points);
  }

function drawSpline(spline, color, thickness, iter) {
// 3D rendering code goes here
// For demonstration, I'm logging the spline points
console.log("spline");
console.log(spline);
}
let mySpline1 = createSpline([draggables[0], draggables[1], draggables[2], draggables[3]]);

let thickness = 4;
let res = 200;
drawSpline(mySpline1.getP, "#000000", thickness, res);

// Kamera einrichten
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;
camera.position.x = 3;
camera.position.y = 3;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Renderer erstellen
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Beleuchtung hinzufügen
var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

// Light Helper hinzufügen
var lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper);

// Grid Helper hinzufügen
var gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);


// Fenstergrößenänderung behandeln
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
});


const rayCaster = new THREE.Raycaster();


const points = [ 
    new THREE.Vector3(-0, 1, 1),
    new THREE.Vector3(.5, -2, 2),
    new THREE.Vector3(.5, .5, 1),
];

window.addEventListener('click', function() {
    // Berechnen Sie die zufällige Z-Koordinate
    const alpha = 3
    let posX = alpha * mousePosition.x
    let posY = alpha * mousePosition.y
    let randomZ = Math.random() * (Math.abs(posX) + Math.abs(posY));

    // Erstellen Sie einen neuen Punkt mit den Mauskoordinaten und der zufälligen Z-Koordinate
    let newPoint = new THREE.Vector3(posY, posX, posZ);

    // Fügen Sie den neuen Punkt zum Punkte-Array hinzu
    points.push(newPoint);

    path = new THREE.CatmullRomCurve3(points);
    pathGeometry.dispose(); // Alte Geometrie entsorgen
    pathGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(50));

    // Aktualisieren Sie das Line-Objekt mit der neuen Geometrie
    pathObject.geometry = pathGeometry;
    scene.add(pathObject);

});

var path = new THREE.CatmullRomCurve3(points);
var pathGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(50));
var pathMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
var pathObject = new THREE.Line(pathGeometry, pathMaterial);

scene.add(pathObject);
// Render-Schleife
function animate_() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
function animate() {
    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);


    const time = Date.now();
    const t = (time/2000 % points.length) / points.length;
    //group.rotation.x = Math.PI
    //cy.rotation.x = Math.PI
    group.rotation.z += t/100;
    group.rotation.y += t/100;
    const position = path.getPointAt(t);
    group.position.copy(position);

    const tangent = path.getTangentAt(t).normalize();
    group.lookAt(position.clone().add(tangent));
    for(let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.name === 'bubble') {
            intersects[i].object.rotation.x = time / 100 + Math.random();
        }
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}

animate();
