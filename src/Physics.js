// Physics.js
import * as THREE from "three";

// الثوابت (قابلة للتعديل من خلال الواجهة)
const defaultConfig = {
  // البيئة (بيئة المحاكاة)
  rho: 1.225,                 // كثافة الهواء (kg/m^3)
  g: 9.81,                    // تسارع الجاذبية (m/s^2)
  wind: new THREE.Vector3(0, 0, 0), // متجه الرياح (m/s)

  // الكتلة (Mass)
  mass: 90,                   // الكتلة الإجمالية (kg)

  // الديناميكا الهوائية (Aerodynamics)
  Cd_body: 1.0,               // معامل السحب (الشخص أثناء السقوط الحر)
  Cd_canopy: 2.0,             // معامل السحب (المظلة المفتوحة بالكامل)
  A_body: 0.7,                // مساحة السطح (الشخص)
  A_canopy: 40,               // مساحة السطح (المظلة)

  // الرفع (Lift)
  Cl: 1.5,                    // معامل الرفع (تحت المظلة)

  // فتح المظلة (Parachute opening)
  T_open: 3.0,                // وقت فتح المظلة (ثواني)
  openTime: 0,                // الوقت المنقضي منذ فتح المظلة
  openProgress: 0,            // تقدم فتح المظلة (0-1)

  // التباطؤ النهائي (Final deceleration)
  decelerationThreshold: 20,  // ارتفاع التباطؤ النهائي (المتر)
  decelerationBoost: 0.5,     // معامل الزيادة للتباطؤ النهائي (0-1)

  // مستوى الأرض
  groundY: 0                  // مستوى الأرض (لا توجد مرحلة "ملامسة الأرض")
};

// الحالة الحالية للمحاكاة
const state = {
  position: new THREE.Vector3(0, 1000, 0), // الموقع الابتدائي (متر)
  velocity: new THREE.Vector3(0, 0, 0),    // السرعة الابتدائية (متر/ثانية)
  acceleration: new THREE.Vector3(0, 0, 0), // التسارع الابتدائي (متر/ثانية^2)
  time: 0,                                 // الزمن (ثواني)
  phase: "سقوط حر",                        // المرحلة الحالية
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
  liftForce: 0,
  weight: 0,
  terminalVelocity: 0
};

// حساب قوة السحب
function calculateDragForce() {
  const vRel = state.velocity.clone().sub(config.wind); // السرعة النسبية
  const speedRel = vRel.length();
  const q = 0.5 * config.rho * speedRel * speedRel; // الضغط الديناميكي
  const CdA_body = config.Cd_body * config.A_body;
  const CdA_canopy = config.Cd_canopy * config.A_canopy;
  const CdA = CdA_body + (CdA_canopy - CdA_body) * state.openProgress;
  const dragForce = vRel.clone().multiplyScalar(-q * CdA / (speedRel || 1));
  return dragForce;
}

// حساب قوة الرفع (عمودية على السرعة النسبية، في الطائرة العمودية)
function calculateLiftForce() {
  const vRel = state.velocity.clone().sub(config.wind);
  const speedRel = vRel.length();

  if (speedRel === 0) return new THREE.Vector3(0, 0, 0);

  // الاتجاه العمودي (نستخدم اتجاه الأفقي كمرجع)
  const horizontal = new THREE.Vector3(vRel.x, 0, vRel.z);
  if (horizontal.length() === 0) return new THREE.Vector3(0, 0, 0);

  const liftDir = horizontal.normalize(); // الاتجاه الأفقي هو اتجاه القوة الرأسية (مثلاً)
  const q = 0.5 * config.rho * speedRel * speedRel;
  const ClA = config.Cl * config.A_canopy * state.openProgress; // فقط تحت المظلة
  const liftMagnitude = q * ClA;
  return liftDir.multiplyScalar(liftMagnitude);
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
  const liftForce = calculateLiftForce();
  const weight = config.mass * config.g;

  // القوة الإجمالية (بما في ذلك الجاذبية، السحب، الرفع)
  const totalForce = new THREE.Vector3(0, -weight, 0).add(dragForce.clone().multiplyScalar(decelerationBoost)).add(liftForce);

  // التسارع
  state.acceleration.copy(totalForce).multiplyScalar(1 / config.mass);

  // التحديث (شبه-أويلر)
  state.velocity.addScaledVector(state.acceleration, dt);
  state.position.addScaledVector(state.velocity, dt);

  // التوقف عند الوصول إلى الارتفاع 0
  if (state.position.y <= config.groundY) {
    state.position.y = 0;
    state.velocity.set(0, 0, 0);
    state.acceleration.set(0, 0, 0);
    // لا نغيّر المرحلة إلى "ملامسة الأرض"، نكتفي بالتوقف
  }

  // تحديث بيانات الواجهة
  telemetry.time = state.time;
  telemetry.altitude = Math.max(0, state.position.y);
  telemetry.speed = state.velocity.length();
  telemetry.verticalSpeed = Math.abs(state.velocity.y); // القيمة المطلقة
  telemetry.horizontalSpeed = new THREE.Vector3(state.velocity.x, 0, state.velocity.z).length();
  telemetry.kineticEnergy = calculateKineticEnergy();
  telemetry.potentialEnergy = calculatePotentialEnergy();
  telemetry.dynamicPressure = 0.5 * config.rho * state.velocity.lengthSq();
  telemetry.dragForce = dragForce.length();
  telemetry.liftForce = liftForce.length();
  telemetry.weight = weight;
  telemetry.terminalVelocity = calculateTerminalVelocity();
}

// بدء عملية فتح المظلة
function openParachute() {
  if (state.phase === "سقوط حر") {
    state.phase = "فتح المظلة";
    state.openProgress = 0;
  }
}

// الحلقة الرئيسية لتحديث المحاكاة
function step(dt) {
  updatePhysics(dt);

  // تسجيل التفاصيل (اختياري)
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
  console.log('Forces:', {
    drag: telemetry.dragForce.toFixed(2),
    lift: telemetry.liftForce.toFixed(2),
    weight: telemetry.weight.toFixed(2)
  }, 'N');
  console.log('Energy:', {
    kinetic: (telemetry.kineticEnergy / 1000).toFixed(2),
    potential: (telemetry.potentialEnergy / 1000).toFixed(2)
  }, 'kJ');
  console.log('Parachute:', {
    openProgress: state.openProgress.toFixed(2),
    terminalVelocity: telemetry.terminalVelocity.toFixed(2)
  });
  console.log('-----------------------------------');
}

// عرض المعاملات للواجهة
const config = defaultConfig;

// إعادة تعيين المحاكاة
function resetSimulation() {
  state.position.set(0, 1000, 0);
  state.velocity.set(0, 0, 0);
  state.acceleration.set(0, 0, 0);
  state.time = 0;
  state.phase = "سقوط حر";
  state.openProgress = 0;

  Object.assign(config, defaultConfig);

  console.log('تمت إعادة تعيين المحاكاة');
}

// تصدير كل شيء
export {
  state,
  telemetry,
  config,
  step,
  updatePhysics,
  openParachute,
  resetSimulation
};