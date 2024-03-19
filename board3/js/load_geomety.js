const colorValue = 0.9; // Mittelgrau
const emissiveValue = 0.2; // Schwaches Emissionslicht
const metalness = 0.8;
const roughness = 0.3;
const opacity = 0.7;
const transparent = true;
const wireframe = true;
const reflectivity = 0.6;

function createThreeMaterial(r, g, b, emissiveValue, metalness, roughness) {
    // Überprüfen, ob die übergebenen Werte zwischen 0 und 1 liegen
    const validateValue = (value) => (value >= 0 && value <= 1) ? value : 0;

    // Validieren der Eingabewerte
    r = Math.floor(validateValue(r)*255);
    g = Math.floor(validateValue(g)*255);
    b = Math.floor(validateValue(b)*255);
    emissiveValue = validateValue(emissiveValue);
    metalness = validateValue(metalness);
    roughness = validateValue(roughness);

    // Erstellen des Materials mit THREE.MeshStandardMaterial
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(r, g, b),
        emissive: new THREE.Color(emissiveValue, emissiveValue, emissiveValue),
        metalness: metalness,
        roughness: roughness
    });

    return material;
}

//const bubbleMaterial = createThreeMaterial(sinNormalization(data.transferCount+25, 0, 1, false), data.avgTimeBetweenTransfers, data.normalizedApprovalCount, sinNormalization(data.mintDuration, 0, 1, false), sinNormalization(data.mintDuration**2, 0, 1, false), sinNormalization(data.mintDuration, 0, 2, false));
const bubbleMaterial = new THREE.MeshStandardMaterial({
    emissive: 0xFFEF00, // Grün
    emissiveIntensity: 0.5,
    roughness: 0.61,
    metalness: 0.21,
    side: THREE.FrontSide,
    //wireframe: true
  });
  

function seededRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function selectRandomGeometry(geometries, seed) {
    if (geometries.length === 0) {
        return null; // Keine Geometrien verfügbar
    }
    const randomIndex = Math.floor(seededRandom(seed) * geometries.length);
    const selectedGeometry = geometries[randomIndex];

    // Definiere vertices und faces aus der ausgewählten Geometrie
    const vertices = selectedGeometry.vertices;
    const faces = selectedGeometry.faces;

    return { vertices, faces };
}




function createMirroredGeometry(originalGeometry, mirrorX, mirrorY) {
    // Klonen der ursprünglichen Geometrie, um unabhängige Kopien zu haben
    const geometryClone = originalGeometry.clone();

    // Spiegelung an der X-Achse
    if (mirrorX) {
        geometryClone.position.x *= -1;
    }

    // Spiegelung an der Y-Achse
    if (mirrorY) {
        geometryClone.position.z *= -1; 
    }

    return geometryClone;
}


function createCustomMaterial(params) {
    // Standardwerte für Parameter festlegen

    // Überschreiben Sie die Standardwerte mit benutzerdefinierten Werten
    const materialParams = {...params};

    // Konvertiert Float-Werte in Farben
    materialParams.color = floatToColor(materialParams.colorValue);
    materialParams.emissive = floatToColor(materialParams.emissiveValue);

    // Erstellen Sie ein MeshStandardMaterial mit den angegebenen Parametern
    return new THREE.MeshStandardMaterial(materialParams);
}
function floatToColor(value) {
    const r = Math.floor(value * 255);
    const g = Math.floor((1 - value) * 255);
    const b = 0; // Für Orange setzen wir Blau auf 0
    return (r << 16) + (g << 8) + b;
}

// Beispiel für die Verwendung der Funktion

// Beispiel für die Verwendung der Funktion

const { vertices, faces } = selectRandomGeometry(geometries, 0);

// const originalDup = createMirroredGeometry(originalGeometry, false, false);
// const mirroredX = createMirroredGeometry(originalGeometry, true, false);
// const mirroredY = createMirroredGeometry(originalGeometry, false, true);
// const mirroredXY = createMirroredGeometry(originalGeometry, true, true);

// Create geometry
const bubbleGeometry = new THREE.BufferGeometry();

// Convert vertices and faces to typed arrays
const verticesFloat32 = new Float32Array(vertices.flat());
const facesUint16 = new Uint16Array(faces.flat());

// Set attributes and index for the geometry
bubbleGeometry.setAttribute('position', new THREE.BufferAttribute(verticesFloat32, 3));
bubbleGeometry.setIndex(new THREE.BufferAttribute(facesUint16, 1));
bubbleGeometry.computeVertexNormals();

// Create material

const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

bubble.position.x = 0;
bubble.position.y = 0;
bubble.position.z = 0;

bubble.castShadow = false;
bubble.receiveShadow = false;
bubble.material.side = THREE.DoubleSide;
scene.add(bubble);


 /// REIFEN
 ///


// Parameter: 
//   radius — Radius des Torus (Abstand vom Zentrum des Torus-Rohres zum Zentrum des Torus)
//   tube — Radius des Torus-Rohres
//   radialSegments — Anzahl der Segmente um den Radius des Torus (ähnlich Längengrade)
//   tubularSegments — Anzahl der Segmente um den Schlauch des Torus (ähnlich Breitengrade)
//   arc — Zentraler Winkel des Torus in Radiant (2 * Math.PI entspricht einem vollständigen Torus)
var torusGeometry = new THREE.TorusGeometry(1, .6, 16, 16, 2 * Math.PI);

// Material für den Torus
var torusMaterial = new THREE.MeshBasicMaterial({ color: "white" });

// Mesh erstellen
var torus = new THREE.Mesh(torusGeometry, torusMaterial);

torus.scale.set(.025, .025, .025); 
torus.scale.z = torus.scale.z * 2 // BREITE DER ROLLEN

torus.rotation.y = Math.PI * .5;

var boundingBox = new THREE.Box3().setFromObject(bubble);


// Sie können die Zentrum, Größe und andere Eigenschaften der Bounding Box bekommen
var center = boundingBox.getCenter(new THREE.Vector3());
var size = boundingBox.getSize(new THREE.Vector3());

var alphaX = 0.8; // Beispiel: Mitte der Bounding Box in X-Richtung
var alphaY = -1; // Beispiel: Mitte der Bounding Box in Y-Richtung
var alphaZ = 0.8; // Beispiel: Mitte der Bounding Box in Z-Richtung

// Berechnen der neuen Position
var newPosition = boundingBox.min.clone().add(
    boundingBox.max.clone().sub(boundingBox.min).multiply(new THREE.Vector3(alphaX, alphaY, alphaZ))
);

// Positionieren des Torus
torus.position.set(newPosition.x, newPosition.y, newPosition.z);


const originalDup = createMirroredGeometry(torus, false, false);
const mirroredX = createMirroredGeometry(torus, true, false);
const mirroredY = createMirroredGeometry(torus, false, true);
const mirroredXY = createMirroredGeometry(torus, true, true);


scene.add(originalDup);
scene.add(mirroredX);
scene.add(mirroredY);
scene.add(mirroredXY);


function createConnectingCylinder(torus1, torus2) {
    var position1 = torus1.position;
    var position2 = torus2.position;

    // Berechnen Sie die Mitte zwischen den beiden Tori
    var midPoint = position1.clone().lerp(position2, 0.5);

    // Berechnen Sie die Länge des Zylinders
    var distance = position1.distanceTo(position2);
    distance = distance * (2 + torus1.scale.z)

    var cylinderGeometry = new THREE.CylinderGeometry(0.025, 0.025, distance, 16);
    var cylinderMaterial = new THREE.MeshBasicMaterial();
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    const CYL_SCALE = 0.5;
    cylinder.scale.set(CYL_SCALE, CYL_SCALE, CYL_SCALE);
    cylinder.position.copy(midPoint);
    cylinder.lookAt(position2);
    cylinder.rotateX(Math.PI / 2);

    return cylinder;
}

// Verwenden Sie nun die Funktion, um Zylinder für die verschiedenen Tori-Kombinationen zu erstellen
var cylinder1 = createConnectingCylinder(originalDup, mirroredX);
var cylinder2 = createConnectingCylinder(mirroredY, mirroredXY);

// Fügen Sie den Zylinder zur Szene hinzu
scene.add(cylinder1);
scene.add(cylinder2);





var group = new THREE.Group();
group.add(originalDup);
group.add(mirroredX);
group.add(mirroredY);
group.add(mirroredXY);
group.add(bubble);
group.add(cylinder1);
group.add(cylinder2);
scene.add(group);


console.log(group)
