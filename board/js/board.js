
  
const kappa = data.relativeTradeVolume + data.tokenToTotalTransferRatio; // data 
const SPEED = sinNormalization(kappa, 0, 4, false);;
const NR_POINTS= 2 + sinNormalization(data.transferCount, 0, 20, true)


const MAX_BOUND = 3;
const MIN_BOUND = -MAX_BOUND;

console.log(bubble)
group.name = "group";
// Sphere-Geometrie erstellen

document.addEventListener('wheel', onMouseWheel, false);

function onMouseWheel(event) {
    // Delta bestimmen, das angibt, wie 32wwwwwwwwwwwwwwwwwwwwwwwwwwwviel gezoomt werden soll
    const delta = event.deltaY;

    // Zoom-Geschwindigkeit festlegen
    const zoomSpeed = 0.01;

    // Kamera entlang der Blickrichtung bewegen
    camera.position.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(delta * zoomSpeed));

    // Kamera-Update erzwingen
    camera.updateProjectionMatrix();
}

// Kamera einrichten
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = -10;
camera.position.x = 0;
camera.position.y = 0;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Renderer erstellen
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Beleuchtung hinzufügen
var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);



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


function generateRandomPoints(numPoints) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * (MAX_BOUND - MIN_BOUND) + MIN_BOUND;
        const y = Math.random() * (MAX_BOUND - MIN_BOUND) + MIN_BOUND;
        const z = Math.random() * (MAX_BOUND - MIN_BOUND) + MIN_BOUND;
        points.push(new THREE.Vector3(x, y, z));
    }
    return points;
}

const points = generateRandomPoints(NR_POINTS);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedPoint = null;
let dragOffset = new THREE.Vector3();

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (selectedPoint) {
        raycaster.setFromCamera(mouse, camera);
        const camNearPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selectedPoint.z);
        const targetPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(camNearPlane, targetPoint);
        if (targetPoint) {
            selectedPoint.x = targetPoint.x;
            selectedPoint.y = targetPoint.y;
            selectedPoint.mesh.position.copy(targetPoint); // Update the mesh position
            updateCurve();
        }
    }
}


function onMouseDown(event) {
    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(points.map(p => p.mesh));

    if (intersects.length > 0) {
        // Assuming each mesh has a reference back to its corresponding Vector3 point
        selectedPoint = intersects[0].object.userData.point;
        if (selectedPoint) {
            dragOffset.copy(intersects[0].point).sub(selectedPoint);
        }
    }
}

function onMouseUp(event) {
    event.preventDefault();
    selectedPoint = null;
}

function updateCurve() {
    //points.push(points[0]);

    path = new THREE.CatmullRomCurve3(points.map(p => p));
    pathGeometry.dispose();
    pathGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(50));
    pathObject.geometry = pathGeometry;
}

// Add a small sphere at each point for visual feedback and interaction
points.forEach(point => {
    const geometry = new THREE.SphereGeometry(0.051, 32, 32);
    const material = new THREE.MeshPhongMaterial ({ color: "darkgray" });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.userData.point = point;
    sphere.position.copy(point);
    scene.add(sphere);
    point.mesh = sphere; // Store reference to the mesh
});

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);


points.push(points[0]);

var path = new THREE.CatmullRomCurve3(points);
var pathGeometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(50));
var pathMaterial = new THREE.LineBasicMaterial({color: "white"});
var pathObject = new THREE.Line(pathGeometry, pathMaterial);

// scene.add(pathObject);


let isMiddleMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener('mousedown', (event) => {
    if (event.button === 1) { // Mittlere Maustaste
        isMiddleMouseDown = true;
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }
});

document.addEventListener('mouseup', (event) => {
    if (event.button === 1) { // Mittlere Maustaste
        isMiddleMouseDown = false;
    }
});

document.addEventListener('mousemove', (event) => {
    if (isMiddleMouseDown) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        // Verschieben der Kamera in eine Richtung, die ihrer aktuellen Ausrichtung entspricht
        const vector = new THREE.Vector3();
        camera.getWorldDirection(vector);
        const right = new THREE.Vector3();
        right.crossVectors(vector, camera.up).normalize();
        const up = new THREE.Vector3();
        up.crossVectors(right, vector).normalize();

        camera.position.add(right.multiplyScalar(-deltaX * 0.01));
        camera.position.add(up.multiplyScalar(deltaY * 0.01));

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }
});
function animate() {
    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);


    const time = Date.now();
    const t = (SPEED*time/2000 % points.length) / points.length;
    //group.rotation.x = Math.PI
    //cy.rotation.x = Math.PI
    group.rotation.z += t/100;
    group.rotation.y += t/100;
    const position = path.getPointAt(t);
    group.position.copy(position);

    const tangent = path.getTangentAt(t).normalize();
    group.lookAt(position.clone().add(tangent));



    intersects.forEach((intersect) => {
        if (intersect.object.name === 'group' || intersect.object.parent.name === 'group') {
            console.log("HIT")
            group.children.forEach(child => {
                // Assign a random velocity if not already assigned
                if (!child.velocity) {
                    const speed = 0.1; // adjust the speed as necessary
                    const direction = new THREE.Vector3(
                        Math.random() * 2 - 1,
                        Math.random() * 2 - 1,
                        Math.random() * 2 - 1 
                    ).normalize().multiplyScalar(speed);
                    child.velocity = direction;
                }
            });
        }
    });

    // camera.position.x = group.position.x + 1;
    // camera.position.y = group.position.y + 1;
    // camera.position.z = group.position.z + .5;
    // camera.lookAt(tangent)
    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}

animate();
