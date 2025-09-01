// Physics.js
import * as THREE from "three";

// الثوابت (قابلة للتعديل من خلال الواجهة)
const defaultConfig = {
  // البيئة (بيئة المحاكاة)
  rho: 1.225,                 // كثافة الهواء (kg/m^3)
  g: 9.81,                    // تسارع الجاذبية (m/s^2)
  wind: new THREE.Vector3(3, 0, 1.5), // متجه الرياح (m/s) - realistic light wind with slight variation

  // الكتلة (Mass)
  mass: 90,                   // الكتلة الإجمالية (kg)

  // الديناميكا الهوائية (Aerodynamics)
  Cd_body: 1.0,               // معامل السحب (الشخص أثناء السقوط الحر) - more realistic value for skydiver
  Cd_canopy: 2.0,             // معامل السحب (المظلة المفتوحة بالكامل) - increased for more realistic deceleration
  A_body: 0.7,                // مساحة السطح (الشخص)
  A_canopy: 40,               // مساحة السطح (المظلة) - increased for more realistic parachute size

  // الرفع (Lift)
  Cl: 1.5,                    // معامل الرفع (تحت المظلة) - increased for more realistic lift

  // فتح المظلة (Parachute opening)
  T_open: 3.0,                // وقت فتح المظلة (ثواني) - increased for more realistic opening time
  openTime: 0,                // الوقت المنقضي منذ فتح المظلة (ثواني)
  openProgress: 0,            // تقدم فتح المظلة (0-1)

  // التباطؤ النهائي (Final deceleration)
  decelerationThreshold: 20,  // ارتفاع التباطؤ النهائي (المتر)
  decelerationBoost: 0.5,     // معامل الزيادة للتباطؤ النهائي (0-1)

  // ملامسة الأرض (Ground contact)
  groundY: 0,                 // مستوى الأرض (Y=0)
  k: 50000,                   // ثابت الزنبرك لملامسة الأرض (N/m)
  c: 5000,                    // ثابت المخمّد لملامسة الأرض (N·s/m)
  stickEps: 0.25              // السرعة التي نعتبر التوقف التام عندها (m/s)
};

// الحالة الحالية للمحاكاة
const state = {
  position: new THREE.Vector3(0, 1000, 0), // الموقع الابتدائي (متر)
  velocity: new THREE.Vector3(0, 0, 0),    // السرعة الابتدائية (متر/ثانية)
  acceleration: new THREE.Vector3(0, 0, 0), // التسارع الابتدائي (متر/ثانية^2)
  time: 0,                                 // الزمن (ثواني)
  phase: "سقوط حر",                        // المرحلة الحالية (سقوط حر، فتح المظلة، تحت المظلة، ملامسة الأرض)
  openProgress: 0,                         // تقدم فتح المظلة (0-1)
};

// بيانات الواجهة
const telemetry = {
  time: 0,
  altitude: 0,
  speed: 0,
  verticalSpeed: 0,
  horizontalSpeed: 0,
  kineticEnergy: 0,
  potentialEnergy: 0,
  dynamicPressure: 0,
  dragForce: 0,
  weight: 0,
  groundForce: 0,
  terminalVelocity: 0
};

// دوال حساب القوى والطاقة والسرعات

// حساب قوة السحب
function calculateDragForce() {
  const vRel = state.velocity.clone().sub(config.wind); // السرعة النسبية (متر/ثانية)
  const speedRel = vRel.length();
  const q = 0.5 * config.rho * speedRel * speedRel; // الضغط الديناميكي
  const CdA_body = config.Cd_body * config.A_body;
  const CdA_canopy = config.Cd_canopy * config.A_canopy;
  const CdA = CdA_body + (CdA_canopy - CdA_body) * state.openProgress; // المساحة المكافئة للسحب (تدرّج بين السقوط الحر والمظلة)
  const dragForce = vRel.clone().multiplyScalar(-q * CdA / (speedRel || 1)); // قوة السحب (متجه)
  return dragForce;
}

// حساب السرعة الحدّية
function calculateTerminalVelocity() {
  const CdA_body = config.Cd_body * config.A_body;
  const CdA_canopy = config.Cd_canopy * config.A_canopy;
  const dragCoeff = state.phase === "سقوط حر" ? CdA_body : CdA_canopy;
  return Math.sqrt((2 * config.mass * config.g) / (config.rho * dragCoeff));
}

// حساب الطاقة الحركية
function calculateKineticEnergy() {
  return 0.5 * config.mass * state.velocity.lengthSq();
}

// حساب الطاقة الكامنة
function calculatePotentialEnergy() {
  return config.mass * config.g * Math.max(0, state.position.y - config.groundY);
}

// تحديث حالة المحاكاة لكل خطوة زمنية
function updatePhysics(dt) {
  state.time += dt;

  // فتح المظلة تلقائيًا عند الوصول إلى ارتفاع معين (اختياري)
  if (config.openAutoAtAltitude && state.phase === "سقوط حر" && state.position.y <= config.openAutoAtAltitude) {
    openParachute();
  }

  // تحديث تقدم فتح المظلة والمرحلة
  if (state.phase === "فتح المظلة") {
    state.openProgress += dt / config.T_open;
    if (state.openProgress >= 1) {
      state.phase = "تحت المظلة";
      state.openProgress = 1;
    }
  }

  // التباطؤ النهائي (زيادة السحب قرب الأرض)
  let decelerationBoost = 1;
  if (state.position.y <= config.decelerationThreshold && state.phase === "تحت المظلة") {
    decelerationBoost = 1 + config.decelerationBoost;
  }

  // حساب القوى
  const dragForce = calculateDragForce();
  const weight = config.mass * config.g;

  // تطبيق الجاذبية والسحب للحصول على القوة الإجمالية
  const totalForce = new THREE.Vector3(0, -weight, 0).add(dragForce.clone().multiplyScalar(decelerationBoost));

  // حساب التسارع باستخدام F = m * a (قانون نيوتن الثاني)
  state.acceleration.copy(totalForce).multiplyScalar(1 / config.mass);

  // تحديث السرعة والموقع باستخدام طريقة شبه-أويلر
  state.velocity.addScaledVector(state.acceleration, dt);
  state.position.addScaledVector(state.velocity, dt);

  // التوقف عند ملامسة الأرض (التحقق من الحد الأدنى للسرعة)
  if (state.position.y <= config.groundY && Math.abs(state.velocity.y) < config.stickEps) {
    state.position.y = config.groundY;
    state.velocity.set(0, 0, 0);
    state.acceleration.set(0, 0, 0);
    state.phase = "ملامسة الأرض"; // التبديل إلى المرحلة "LAND" عند التوقف التام
  }

  // تحديث البيانات للواجهة
  telemetry.time = state.time;
  telemetry.altitude = state.position.y;
  telemetry.speed = state.velocity.length();
  telemetry.verticalSpeed = state.velocity.y;
  telemetry.horizontalSpeed = new THREE.Vector3(state.velocity.x, 0, state.velocity.z).length();
  telemetry.kineticEnergy = calculateKineticEnergy();
  telemetry.potentialEnergy = calculatePotentialEnergy();
  telemetry.dynamicPressure = 0.5 * config.rho * state.velocity.lengthSq();
  telemetry.dragForce = dragForce.length();
  telemetry.weight = weight;
  telemetry.groundForce = Math.abs(totalForce.y);
  telemetry.terminalVelocity = calculateTerminalVelocity();
}

// بدء عملية فتح المظلة
function openParachute() {
  if (state.phase === "سقوط حر") {
    state.phase = "فتح المظلة";
    state.openProgress = 0;
    state.time = 0;
  }
}

// الحلقة الرئيسية لتحديث المحاكاة (تُستدعى في كل إطار)
function step(dt) {
  updatePhysics(dt);

  // Detailed console logging for debugging and comparison with GUI
  console.log('%c Physics Simulation Data', 'background: #222; color: #bada55; font-size: 12px;');
  console.log('Time:', state.time.toFixed(2) + 's', '| Phase:', state.phase);
  console.log('Position:', {
    x: state.position.x.toFixed(2),
    y: state.position.y.toFixed(2),
    z: state.position.z.toFixed(2)
  }, 'm');
  console.log('Velocity:', {
    x: state.velocity.x.toFixed(2),
    y: state.velocity.y.toFixed(2),
    z: state.velocity.z.toFixed(2),
    magnitude: state.velocity.length().toFixed(2)
  }, 'm/s');
  console.log('Acceleration:', {
    x: state.acceleration.x.toFixed(2),
    y: state.acceleration.y.toFixed(2),
    z: state.acceleration.z.toFixed(2),
    magnitude: state.acceleration.length().toFixed(2)
  }, 'm/s²');
  console.log('Energy:', {
    kinetic: (telemetry.kineticEnergy / 1000).toFixed(2),
    potential: (telemetry.potentialEnergy / 1000).toFixed(2),
    total: ((telemetry.kineticEnergy + telemetry.potentialEnergy) / 1000).toFixed(2)
  }, 'kJ');
  console.log('Forces:', {
    drag: telemetry.dragForce.toFixed(2),
    weight: telemetry.weight.toFixed(2),
    ground: telemetry.groundForce.toFixed(2)
  }, 'N');
  console.log('Parachute:', {
    openProgress: state.openProgress.toFixed(2),
    terminalVelocity: telemetry.terminalVelocity.toFixed(2)
  });
  console.log('-----------------------------------');

  // تحديث الواجهة هنا باستخدام قيم telemetry (كائن telemetry)
}

// عرض المعاملات للواجهة (لتعديل الثوابت)
const config = defaultConfig; // الإعدادات الافتراضية، قابلة للتعديل أثناء التشغيل

// Reset simulation to initial state
function resetSimulation() {
  // Reset position and velocity
  state.position.set(0, 1000, 0);
  state.velocity.set(0, 0, 0);
  state.acceleration.set(0, 0, 0);

  // Reset time and phase
  state.time = 0;
  state.phase = "سقوط حر";
  state.openProgress = 0;

  // Reset config to default values if needed
  Object.assign(config, defaultConfig);

  console.log('Simulation reset to initial state');
}

// Export functions for testing
export {
  state,
  telemetry,
  config,
  step,
  calculateDragForce,
  calculateTerminalVelocity,
  calculateKineticEnergy,
  calculatePotentialEnergy,
  updatePhysics,
  openParachute,
  resetSimulation
};


