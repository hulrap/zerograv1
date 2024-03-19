const materialParams = {
    colorValue: .2, emissiveValue: 0.2, metalness: 0.8, 
    roughness: 0.3, opacity: 0.7, transparent: true, 
    wireframe: true, reflectivity: 0.6
};
function createThreeMaterial(r, g, b, emissiveValue, metalness, roughness) {
    // Überprüfen, ob die übergebenen Werte zwischen 0 und 1 liegen
    const validateValue = (value) => (value >= 0 && value <= 1) ? value : 0;

    // Validieren der Eingabewerte
    r = validateValue(r);
    g = validateValue(g);
    b = validateValue(b);
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

const bubbleMaterial = createThreeMaterial(sinNormalization(data.transferCount, 0, 1, false), data.avgTimeBetweenTransfers, data.normalizedApprovalCount, sinNormalization(data.mintDuration, 0, 1, false), sinNormalization(data.mintDuration**2, 0, 1, false), sinNormalization(data.mintDuration, 0, 1, false));

function seededRandom(seed) {
    return Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
}

function selectRandomGeometry(geometries, seed) {
    if (geometries.length === 0) return null;
    const index = Math.floor(seededRandom(seed) * geometries.length);
    return geometries[index];
}

function mirrorGeometry(geometry, mirrorX, mirrorY) {
    const clone = geometry.clone();
    if (mirrorX) clone.position.x *= -1;
    if (mirrorY) clone.position.z *= -1;
    return clone;
}

function floatToColor(value) {
    const r = Math.floor(value * 255), g = Math.floor((1 - value) * 255);
    return (r << 16) + (g << 8);
}

function createCustomMaterial(params) {
    return new THREE.MeshStandardMaterial({
        color: floatToColor(params.colorValue), 
        emissive: floatToColor(params.emissiveValue),
        ...params
    });
}

function createGeometry(vertices, faces) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices.flat()), 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(faces.flat()), 1));
    geometry.computeVertexNormals();
    return geometry;
}

function setupMesh(geometry, materialParams) {
    const material = createCustomMaterial(materialParams);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = mesh.receiveShadow = false;
    mesh.material.side = THREE.DoubleSide;
    return mesh;
}

function createTorus(radius, tube, radialSegments, tubularSegments, arc, material) {
    const torusGeometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
    return new THREE.Mesh(torusGeometry, material);
}

function createConnectingCylinder(torus1, torus2, material) {
    const midPoint = torus1.position.clone().lerp(torus2.position, 0.5);
    const distance = torus1.position.distanceTo(torus2.position) * (2 + torus1.scale.z);
    const cylinderGeometry = new THREE.CylinderGeometry(0.025, 0.025, distance, 16);
    const cylinder = new THREE.Mesh(cylinderGeometry, material);
    cylinder.scale.set(0.5, 0.5, 0.5);
    cylinder.position.copy(midPoint);
    cylinder.lookAt(torus2.position);
    cylinder.rotateX(Math.PI / 2);
    return cylinder;
}

const selectedGeometry = selectRandomGeometry(geometries, 0);
const bubbleGeometry = createGeometry(selectedGeometry.vertices, selectedGeometry.faces);
const bubble = setupMesh(bubbleGeometry, bubbleMaterial);

const torusMaterial = new THREE.MeshBasicMaterial({ color: "white" });
const torus = createTorus(1, 0.6, 16, 16, 2 * Math.PI, torusMaterial);
torus.scale.set(0.025, 0.025, 0.05);
torus.rotation.y = Math.PI * 0.5;
const boundingBox = new THREE.Box3().setFromObject(bubble);
const newPosition = boundingBox.min.clone().add(boundingBox.max.clone().sub(boundingBox.min).multiply(new THREE.Vector3(0.8, -1, 0.8)));
torus.position.set(newPosition.x, newPosition.y, newPosition.z);

const group = new THREE.Group();
group.add(bubble);


['original', 'mirrorX', 'mirrorY', 'mirrorXY'].forEach(type => {
    const mirrored = mirrorGeometry(torus, type.includes('X'), type.includes('Y'));
    group.add(mirrored);
    if (group.children.length > 1) {
        const cylinder = createConnectingCylinder(group.children[0], mirrored, bubbleMaterial);
        group.add(cylinder);
    }
});
const tori = ['original', 'mirrorX', 'mirrorY', 'mirrorXY'].map(type => {
    const mirrored = mirrorGeometry(torus, type.includes('X'), type.includes('Y'));
    group.add(mirrored);
    return mirrored;
});

tori.forEach((t1, i) => {
    tori.slice(i + 1).forEach(t2 => {
        const cylinder = createConnectingCylinder(t1, t2, bubbleMaterial);
        group.add(cylinder);
    });
});

var cylinder1 = createConnectingCylinder(tori[0], tori[1]);
var cylinder2 = createConnectingCylinder(tori[2], tori[3]);
group.add(cylinder1)
group.add(cylinder2)

scene.add(group);
