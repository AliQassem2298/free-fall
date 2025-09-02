// script.js


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// إضافة استيرادات جديدة للفيزياء والواجهات
import { step, state, telemetry, config, openParachute, resetSimulation } from './Physics.js';
import { ConfigGUI } from './gui/config-gui.js';
import * as dat from 'lil-gui'; // ✅ Modern, lightweight

import { TelemetryOverlay } from './gui/TelemetryOverlay.js';

// After physics imports
const telemetryOverlay = new TelemetryOverlay(state, telemetry, config);



const configGUI = new ConfigGUI(); // ✅ This should work


const METERS_TO_UNITS = 0.01; // 1 متر = 0.01 وحدة في المشهد
const UNITS_TO_METERS = 100;  // 1 وحدة = 100 متر (لتحويل موقع الهليكوبتر)
/*
            Base
*/
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()



// بدء تحديث عرض البيانات
// telemetryGUI.startUpdating();

/*
            Models
*/
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

let mixer = null
let mixer2 = null

let helicopter = null
let parachute = null
let paratrooper = null
const mixers = [];//Animation

gltfLoader.load(
  '/models/helicopter/bell206_helicopter.glb',
  (gltf) => {
    gltf.scene.scale.set(11, 11, 11);
    gltf.scene.translateY(4.2);

    helicopter = gltf.scene;

    scene.add(helicopter);

    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(helicopter);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
      mixers.push(mixer);
    }
    else {
      console.log('No animations found in the GLTF file.');
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error);
  }
)

//

gltfLoader.load(
  '/models/car1.glb',
  (gltf) => {
    gltf.scene.scale.set(11, 11, 11)
    gltf.scene.translateZ(-20.5)
    gltf.scene.translateX(-45)
    gltf.scene.rotateY(30)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let vehicle1 = gltf.scene;
    vehicle1.position.y = 5;
    scene.add(vehicle1);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/car2.glb',
  (gltf) => {
    gltf.scene.scale.set(11, 11, 11)
    gltf.scene.translateZ(-125)
    gltf.scene.translateX(100)
    gltf.scene.rotateY(60)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let vehicle2 = gltf.scene;
    vehicle2.position.y = 5;
    scene.add(vehicle2);

    scene.add(vehicle2)

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/motor.glb',
  (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.translateZ(-20.5)
    gltf.scene.translateX(-25)
    gltf.scene.rotateY(25)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let vehicle3 = gltf.scene;
    vehicle3.position.y = 3;
    scene.add(vehicle3);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/car3.glb',
  (gltf) => {
    gltf.scene.scale.set(11, 11, 11)
    gltf.scene.translateZ(-100)
    gltf.scene.translateX(50)
    gltf.scene.rotateY(60)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let vehicle4 = gltf.scene;
    vehicle4.position.y = 5;
    scene.add(vehicle4);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/car4.glb',
  (gltf) => {
    gltf.scene.scale.set(0.2, 0.2, 0.2)
    gltf.scene.translateZ(-10)
    gltf.scene.translateX(100)
    gltf.scene.rotateY(55)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let vehicle5 = gltf.scene;
    vehicle5.position.y = 0.1;
    scene.add(vehicle5);

    scene.add(vehicle5)

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//White Jeep

gltfLoader.load(
  '/models/car5.glb',
  (gltf) => {
    gltf.scene.scale.set(2, 2, 2)
    gltf.scene.translateZ(50)
    gltf.scene.translateX(100)
    gltf.scene.rotateY(180)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let vehicle6 = gltf.scene;
    vehicle6.position.y = 5;
    scene.add(vehicle6);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

// Green Jepp

gltfLoader.load(
  '/models/car6.glb',
  (gltf) => {
    gltf.scene.scale.set(7.5, 7.5, 7.5)
    gltf.scene.translateZ(40)
    gltf.scene.translateX(130)
    gltf.scene.rotateY(180)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let vehicle7 = gltf.scene;
    vehicle7.position.y = 0.1;
    scene.add(vehicle7);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/personadd.glb',
  (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.translateZ(-5)
    gltf.scene.translateX(90)
    gltf.scene.rotateY(55)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let personadd1 = gltf.scene;
    personadd1.position.y = 6;
    scene.add(personadd1);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/personadd.glb',
  (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.translateZ(-8)
    gltf.scene.translateX(80)
    gltf.scene.rotateY(25)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let personadd2 = gltf.scene;
    personadd2.position.y = 6;
    scene.add(personadd2);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/personadd.glb',
  (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.translateZ(8)
    gltf.scene.translateX(90)
    gltf.scene.rotateY(-60)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let personadd3 = gltf.scene;
    personadd3.position.y = 6;
    scene.add(personadd3);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//

gltfLoader.load(
  '/models/syrianflag.glb',
  (gltf) => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.translateZ(-20.5);
    gltf.scene.translateX(-45);
    gltf.scene.rotateY(30);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        //
      }
    });

    let syrianf = gltf.scene;
    syrianf.position.y = 5;
    scene.add(syrianf);

    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(syrianf);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
      mixers.push(mixer);
    } else {
      console.log('No animations found in the GLTF file.');
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error);
  }
)

//

gltfLoader.load(
  '/models/realistic_scene_3d.glb',
  (gltf) => {
    gltf.scene.scale.set(10, 10, 10)
    gltf.scene.translateZ(-500)
    gltf.scene.translateX(100)
    gltf.scene.rotateY(60)
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Assign textures to the materials
        // ...
        // Replace specific textures for specific materials
        // ...
      }
    })

    let trees1 = gltf.scene;
    trees1.position.y = -1;
    scene.add(trees1);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    } else {
      console.log('No animations found in the GLTF file.')
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF file:', error)
  }
)

//
gltfLoader.load(
  '/models/parachute/army_parachute.glb',
  (gltf) => {
    gltf.scene.scale.set(5, 5, 5)
    gltf.scene.translateY(15)

    parachute = gltf.scene
    parachute.visible = false

    scene.add(parachute)
  }
)

//

gltfLoader.load(
  '/models/person/persoon.glb',
  (gltf) => {
    gltf.scene.scale.set(0.04, 0.04, 0.04);
    gltf.scene.rotation.y = Math.PI; // Rotate 180° around Y-axis
    paratrooper = gltf.scene;
    paratrooper.visible = false;
    scene.add(paratrooper);
  }
);

/*
            skybox
*/
let skybox = [
  "/skybox/3/6.jpg",
  "/skybox/3/3.jpg",
  "/skybox/3/5.jpg",
  "/skybox/3/2.jpg",
  "/skybox/3/1.jpg",
  "/skybox/3/4.jpg",
];
let skyboxTex = new THREE.CubeTextureLoader().load(skybox);
scene.background = skyboxTex;


/*
            Floor
*/
const floorTexture = textureLoader.load('/textures/floor.jpg');
const floorSize = 200;
const numFloors = 3;

for (let i = -numFloors; i <= numFloors; i++) {
  for (let j = -numFloors; j <= numFloors; j++) {
    const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      metalness: 0,
      roughness: 6.5
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = i * floorSize;
    floor.position.z = j * floorSize;
    floor.position.y = 0;
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);
  }
}


/*
          Lights
*/
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/*
          Sizes
*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/*
          Keyboard
*/
const keyboard = {}

// Flag to track if simulation has started
let simulationStarted = false;

window.addEventListener('keydown', (event) => {
  keyboard[event.key] = true;

  if (event.key === 'c') {
    if (!simulationStarted && helicopter && paratrooper) {
      // تحويل موقع الهليكوبتر من وحدات Three.js إلى أمتار
      const heliPosInMeters = new THREE.Vector3(
        helicopter.position.x * UNITS_TO_METERS,
        helicopter.position.y * UNITS_TO_METERS,
        helicopter.position.z * UNITS_TO_METERS
      );

      // ارتفاع إضافي فوق الهليكوبتر (10 أمتار)
      const offsetAbove = 10;

      // ضبط الحالة الفيزيائية (بالأمتار)
      state.position.set(
        heliPosInMeters.x,
        heliPosInMeters.y + offsetAbove,
        heliPosInMeters.z
      );

      state.velocity.set(0, 0, 0);
      state.time = 0;
      state.phase = "سقوط حر";

      // عرض المظلي فورًا (تحويل من متر إلى وحدات العرض)
      paratrooper.position.set(
        state.position.x * METERS_TO_UNITS,
        state.position.y * METERS_TO_UNITS,
        state.position.z * METERS_TO_UNITS
      );
      paratrooper.visible = true;
      addVisualFeedback("قفز!", 0x00ff00);

      simulationStarted = true;

      // ✅ لا شيء عن الكاميرا هنا — لن تتحرك
    } else if (simulationStarted && state.phase === "سقوط حر") {
      openParachute();
    }
  }
});

window.addEventListener('keyup', (event) => {
  keyboard[event.key] = false
})

// مصفوفة لتخزين التأثيرات المرئية
const visualFeedbacks = [];

// دالة لإضافة تأثير مرئي
function addVisualFeedback(text, color) {
  // إنشاء عنصر نص ثلاثي الأبعاد
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#' + color.toString(16).padStart(6, '0');
  context.font = '24px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);

  // تعيين موضع التأثير المرئي
  sprite.position.set(0, 10, 0);
  sprite.scale.set(5, 1.25, 1);

  // إضافة التأثير المرئي إلى المشهد
  scene.add(sprite);

  // إضافة التأثير المرئي إلى المصفوفة مع وقت الإنشاء والمدة
  visualFeedbacks.push({
    sprite: sprite,
    creationTime: Date.now(),
    duration: 2000, // مدة ظهور التأثير المرئي (2 ثانية)
    opacity: 1.0
  });
}

// دالة لتحديث التأثيرات المرئية
function updateVisualFeedbacks(deltaTime) {
  const currentTime = Date.now();

  // تحديث كل تأثير مرئي
  for (let i = visualFeedbacks.length - 1; i >= 0; i--) {
    const feedback = visualFeedbacks[i];
    const elapsedTime = currentTime - feedback.creationTime;

    // حساب الشفافية بناءً على الوقت المنقضي
    if (elapsedTime < feedback.duration) {
      // تلاشي تدريجي في النصف الثاني من المدة
      if (elapsedTime > feedback.duration / 2) {
        const fadeRatio = 1 - ((elapsedTime - feedback.duration / 2) / (feedback.duration / 2));
        feedback.opacity = fadeRatio;
        feedback.sprite.material.opacity = fadeRatio;
      }

      // تحريك التأثير المرئي للأعلى
      feedback.sprite.position.y += deltaTime * 2;
    } else {
      // إزالة التأثير المرئي بعد انتهاء مدته
      scene.remove(feedback.sprite);
      visualFeedbacks.splice(i, 1);
    }
  }
}

const updateHelicopter = () => {
  const speed = 0.07;

  if (keyboard.w) {
    helicopter.position.y += speed * 1.5;

    if (helicopter.rotation.x < 0.2) {
      helicopter.rotation.x += speed;
      if (helicopter.rotation.x > 0.2) {
        helicopter.rotation.x = 0.2;
      }
    }
  }

  if (keyboard.s) {
    if (helicopter.position.y > 0.2) {
      helicopter.position.y -= speed * 1.5;
      if (helicopter.rotation.x > 0) {
        helicopter.rotation.x -= speed;
        if (helicopter.rotation.x < 0) {
          helicopter.rotation.x = 0;
        }
      }
    }

    else {
      helicopter.position.y = 0.2;
    }
  }

  if (keyboard['d']) {
    const angle = speed * 0.5
    helicopter.position.z += angle * 5
  }
  if (keyboard['a']) {
    const angle = speed * 0.5
    helicopter.position.z -= angle * 5
  }

  // إضافة حركة تموج خفيفة للهليكوبتر لتحسين الواقعية
  if (helicopter) {
    helicopter.position.y += Math.sin(Date.now() * 0.001) * 0.01;
    helicopter.rotation.z = Math.sin(Date.now() * 0.002) * 0.02;
  }
}

// دالة لمزامنة النماذج مع حالة الفيزياء
function updateParatrooperFromPhysics() {
  if (!paratrooper || !state || !simulationStarted) return;

  // تحديث موقع العرض: تحويل من متر إلى وحدات Three.js
  paratrooper.position.set(
    state.position.x * METERS_TO_UNITS,
    state.position.y * METERS_TO_UNITS - 10,
    state.position.z * METERS_TO_UNITS
  );

  // تدوير المظلي
  if (state.velocity.length() > 0.1) {
    const verticalRatio = Math.abs(state.velocity.y) / (state.velocity.length() || 1);
    paratrooper.rotation.x = -Math.PI / 6 * (1 - verticalRatio);
  }

  // تحديث المظلة
  if (parachute && state.openProgress > 0) {
    parachute.visible = true;
    const canopyHeight = 0.07; // 7 متر × 0.01 = 0.07 وحدة
    parachute.position.set(
      state.position.x * METERS_TO_UNITS,
      state.position.y * METERS_TO_UNITS + canopyHeight - 2,
      state.position.z * METERS_TO_UNITS
    );
    const scale = 1 + state.openProgress * 4;
    parachute.scale.set(scale, scale, scale);

    if (state.openProgress > 0.9) {
      const oscillation = Math.sin(Date.now() * 0.003) * 0.05;
      parachute.rotation.z = oscillation;
      parachute.rotation.x = oscillation * 0.5;
    }
  } else {
    parachute.visible = false;
  }

  // الكاميرا تتبع المظلي إذا كان في الهواء (بالوحدات الأصلية)
  if (state.position.y > 1) {
    const displayPos = new THREE.Vector3(
      state.position.x * METERS_TO_UNITS,
      state.position.y * METERS_TO_UNITS,
      state.position.z * METERS_TO_UNITS
    );
    const cameraOffset = new THREE.Vector3(-0.2, 0.15, -0.2);
    const targetPosition = new THREE.Vector3().addVectors(displayPos, cameraOffset);
    // camera.position.lerp(targetPosition, 0.02);
    // controls.target.lerp(displayPos, 0.05);
  }
}


/*
          Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(-57, 11, -17)
camera.far = 500;
const listener = new THREE.AudioListener();
camera.add(listener);
scene.add(camera)

/*
          Controls
*/
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/*
          Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*
          Animate
*/
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = Math.min(0.1, elapsedTime - previousTime);
  previousTime = elapsedTime;

  if (simulationStarted) {
    step(deltaTime);
  }

  updateParatrooperFromPhysics();

  // تحديث المزجات (التحريك)
  for (const mixer of mixers) {
    mixer.update(deltaTime);
  }

  // ✅ التأكد من استدعاء updateHelicopter
  updateHelicopter(); // ⚠️ يجب أن تكون هنا

  controls.update();
  updateVisualFeedbacks(deltaTime);
  telemetryOverlay.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();



export class GUIControls {
  constructor(water, sky, updateSun, submarine) {
    this.water = water;
    this.sky = sky;
    this.updateSun = updateSun;
    this.submarine = submarine;
    this.initGUI();
    this.initOverlay();
  }

  initGUI() {
    const parameters = {
      elevation: 2,
      azimuth: 180,
      distortionScale: this.water.material.uniforms.distortionScale.value,
      size: 5,  // Set the default water size to 5
      desiredSpeed: this.submarine.desiredSpeed || 0, // Initialize with the submarine's current desiredSpeed
      desiredDepth: this.submarine.desiredDepth || 0 // Initialize with the submarine's current desiredDepth
    };

    const gui = new GUI();

    // Sky folder
    const folderSky = gui.addFolder('Sky');
    folderSky.add(parameters, 'elevation', 0, 90, 0.1).onChange((value) => {
      this.updateSun(value, parameters.azimuth);
    });
    folderSky.add(parameters, 'azimuth', -180, 180, 0.1).onChange((value) => {
      this.updateSun(parameters.elevation, value);
    });
    folderSky.open();

    // Water folder
    const waterUniforms = this.water.material.uniforms;
    const folderWater = gui.addFolder('Water');
    folderWater.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
    folderWater.add(parameters, 'size', 0.1, 10, 0.1).name('size').onChange((value) => {
      waterUniforms.size.value = value;  // Update the water size uniform when the GUI value changes
    });
    folderWater.open();


    // Submarine folder
    const folderSubmarine = gui.addFolder('Submarine');
    const desiredSpeedController = folderSubmarine.add(parameters, 'desiredSpeed', -500, 500, 0.1).name('Desired Speed').onChange((value) => {
      this.submarine.desiredSpeed = value;
      this.updateOverlay();
    });

    const desiredDepthController = folderSubmarine.add(parameters, 'desiredDepth', 0, 490, 0.1).name('Desired Depth').onChange((value) => {
      this.submarine.desiredDepth = value;
      this.updateOverlay();
    });

    folderSubmarine.open();
  }

  initOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'gui-overlay';
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.innerHTML = `
            #gui-overlay {
                position: absolute;
                top: 10px;
                left: 10px;
                background: rgba(0, 0, 0, 0.8);
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                color: white;
            }
            #gui-overlay h3 {
                margin: 0 0 10px;
                color: #FFD700; /* Gold color for the title */
            }
            #gui-overlay p {
                margin: 0 0 5px;
            }
        `;
    document.head.appendChild(style);

    overlay.innerHTML = `
            <h3>Submarine Data</h3>
            <div id="submarine-data">
                <p><strong>Current Velocity:</strong> <span id="velocity-value">0</span> m/s</p>
                <p><strong>Current Acceleration:</strong> <span id="acceleration-value">0</span> m/s²</p>
                <p><strong>Thrust Force:</strong> <span id="thrust-force-value">0</span> N</p>
                <p><strong>Drag Force:</strong> <span id="drag-force-value">0</span> N</p>
                <p><strong>Power Output:</strong> <span id="power-output-value">0</span> W</p>
                <p><strong>Power Output:</strong> <span id="power-output-hp-value">0</span> HorsePower</p>
                <p><strong>Gravity Force:</strong> <span id="gravity-force-value">0</span> N</p>
                <p><strong>Buoyancy Force:</strong> <span id="buoyancy-force-value">0</span> N</p>
                <p><strong>Pressure:</strong> <span id="pressure-value">${this.submarine.calculatePressure().toFixed(2)}</span> Pa</p>
                <p><strong>Ballast Percentage:</strong> <span id="ballast-percentage-value">${(this.submarine.ballastPercentage * 100).toFixed(2)}%</span></p>
                <p><strong>Current Depth:</strong> <span id="current-depth-value">${this.submarine.currentDepth.toFixed(2)}</span> m</p>
            </div>
        `;
  }

  updateOverlay() {
    const velocity = this.submarine.velocity.length().toFixed(2);
    const acceleration = this.submarine.acceleration.length().toFixed(5);
    const thrustForce = this.submarine.thrustForce().length().toFixed(2);
    const dragForce = this.submarine.dragForce().length().toFixed(2);
    const powerOutput = Math.abs((this.submarine.velocity.z * thrustForce / this.submarine.propellerEfficiency).toFixed(2));
    const powerOutputHP = Math.abs((powerOutput * 0.00134).toFixed(2));
    const gravityForce = this.submarine.gravityForce().length().toFixed(2);
    const buoyancyForce = this.submarine.buoyancyForce().length().toFixed(2);

    document.getElementById('velocity-value').textContent = velocity;
    document.getElementById('acceleration-value').textContent = acceleration;
    document.getElementById('thrust-force-value').textContent = thrustForce;
    document.getElementById('drag-force-value').textContent = dragForce;
    document.getElementById('power-output-value').textContent = powerOutput;
    document.getElementById('power-output-hp-value').textContent = powerOutputHP;
    document.getElementById('gravity-force-value').textContent = gravityForce;
    document.getElementById('buoyancy-force-value').textContent = buoyancyForce;
    document.getElementById('pressure-value').textContent = this.submarine.calculatePressure().toFixed(2);
    document.getElementById('ballast-percentage-value').textContent = (this.submarine.ballastPercentage * 100).toFixed(2) + '%';
    document.getElementById('current-depth-value').textContent = this.submarine.currentDepth.toFixed(2);
  }
}
