// script.js
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// إضافة استيرادات جديدة للفيزياء والواجهات
import { step, state, telemetry, config, openParachute } from './physics.js';
import { TelemetryGUI } from './gui/telemetry-gui.js';
import { ConfigGUI } from './gui/config-gui.js';


const telemetryGUI = new TelemetryGUI();
const configGUI = new ConfigGUI();

/*
            Base
*/
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()



// بدء تحديث عرض البيانات
telemetryGUI.startUpdating();

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
    gltf.scene.scale.set(0.04, 0.04, 0.04)
    gltf.scene.translateY(6.5)

    paratrooper = gltf.scene
    paratrooper.visible = false

    scene.add(paratrooper)
  }
)

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

  // When 'c' is pressed, either start simulation or open parachute
  if (event.key === 'c') {
    // If simulation hasn't started and helicopter is loaded, start from helicopter position
    if (!simulationStarted && helicopter) {
      // Start simulation from helicopter position
      state.position.set(
        helicopter.position.x,
        helicopter.position.y * 100, // Convert from model units to meters
        helicopter.position.z
      );
      state.velocity.set(0, 0, 0); // Reset velocity
      state.time = 0; // Reset time
      state.phase = "سقوط حر"; // Set phase to free fall

      // Make paratrooper visible and position it at helicopter
      if (paratrooper) {
        paratrooper.visible = true;
        paratrooper.position.copy(helicopter.position);
      }

      simulationStarted = true;
      // Add visual feedback when simulation starts
      addVisualFeedback("Simulation Started", 0x00ff00);
      console.log('Simulation started from helicopter position');
    }
    // If simulation is running and in free fall phase, open the parachute
    else if (simulationStarted && state.phase === "سقوط حر") {
      openParachute();
      // Add visual feedback when parachute opens
      addVisualFeedback("Parachute Opened", 0x0000ff);
      console.log('Parachute opened');
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
  telemetryGUI.updateDisplay(); // لتحديث الـ GUI فورًا

  // Only update models if simulation has started
  if (paratrooper && state && simulationStarted) {
    // مزامنة موقع الفيزياء مع النموذج ثلاثي الأبعاد
    paratrooper.position.set(
      state.position.x,
      state.position.y * 0.01, // تحويل من متر إلى وحدات الموديل
      state.position.z
    );

    // Rotate paratrooper based on velocity direction
    if (state.velocity.length() > 0.1) {
      // Calculate direction from velocity
      const direction = state.velocity.clone().normalize();

      // Create a rotation that points the paratrooper in the direction of movement
      // Assuming the paratrooper model faces forward along the z-axis
      paratrooper.lookAt(paratrooper.position.clone().add(direction));

      // Add a slight tilt based on vertical/horizontal speed ratio
      const verticalRatio = Math.abs(state.velocity.y) / (state.velocity.length() || 1);
      paratrooper.rotation.x = -Math.PI / 6 * (1 - verticalRatio); // Tilt forward when moving horizontally
    }

    // تحديث موضع المظلة بناءً على تقدم الفتح
    if (parachute && state.openProgress > 0) {
      parachute.visible = true;

      // تحريك المظلة فوق الجندي
      parachute.position.set(
        state.position.x,
        (state.position.y * 0.01) + 2, // مسافة فوق الجندي
        state.position.z
      );

      // تغيير مقياس المظلة حسب تقدم الفتح
      const scale = 1 + state.openProgress * 4; // من 1 إلى 5
      parachute.scale.set(scale, scale, scale);

      // Rotate parachute to face upward regardless of movement direction
      parachute.rotation.set(0, 0, 0);

      // إضافة تأثير اهتزاز خفيف للمظلة عند فتحها بالكامل
      if (state.openProgress > 0.9) {
        const oscillation = Math.sin(Date.now() * 0.003) * 0.05;
        parachute.rotation.z = oscillation;
        parachute.rotation.x = oscillation * 0.5;
      }

      // تحديث مرحلة العرض
      telemetry.phase = state.phase;
    } else if (parachute) {
      parachute.visible = false;
    }

    // Follow the paratrooper with camera if simulation is active
    if (simulationStarted && state.position.y > 10) { // Only follow when in air
      // Smoothly move camera to follow paratrooper from behind and above
      const cameraOffset = new THREE.Vector3(-20, 15, -20); // Behind and above
      const targetPosition = new THREE.Vector3().addVectors(
        paratrooper.position,
        cameraOffset
      );

      // Smooth camera movement
      camera.position.lerp(targetPosition, 0.02);
      controls.target.lerp(paratrooper.position, 0.05);
    }
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
  // حماية من القفزات الكبيرة في الوقت
  const deltaTime = Math.min(0.1, elapsedTime - previousTime);
  previousTime = elapsedTime;

  // Only update physics if simulation has started
  if (simulationStarted) {
    // تحديث محاكاة الفيزياء
    step(deltaTime);
  }

  // مزامنة النماذج مع حالة الفيزياء
  updateParatrooperFromPhysics();

  // تحديث المزجرات (الرسوم المتحركة)
  for (const mixer of mixers) {
    mixer.update(deltaTime);
  }

  // تحديث التحكم والهليكوبتر
  controls.update();
  updateHelicopter();

  // تحديث التأثيرات المرئية
  updateVisualFeedbacks(deltaTime);

  // رسم المشهد
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();